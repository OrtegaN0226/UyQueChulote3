//=============================================================================
// Niji - Video Player
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.1.0 Play videos wherever you want
 * @author Niji
 *
 * @help NIJI_VideoPlayer.js
 *
 * This plugin provides commands to play videos.
 * 
 *   Niji.Video.load(id, filename, loop) - Load video into memory
 *   Niji.Video.get(functionName, id) - Get video obj from memory
 *   Niji.Video.unload(id) - Unload video from memory
 *   (Movement, scaling, centering, flipping, muting and volume control removed)
 *   Niji.Video.play(id) - Play a Video object by id
 *   Niji.Video.pause(id) - Pause a Video object by id
 *   Niji.Video.stop(id) - Stop a Video object by id
 *   Niji.Video.setLoop(id) - Make a Video object playing loop by id
 *   Niji.Video.isReady() - Check if all videos have been loaded
 *
 * Full documentation can be found here:
 * 
 * https://nijikokun.itch.io/video-player-mz
 *
 * @command load
 * @text Preload video into memory
 * @desc Loads the video into game memory. Use before any other command.
 * @arg id
 * @type string
 * @text Identifier
 * @desc The identifier you want to use in all other commands
 * @arg filename
 * @type string
 * @text Filename (video.webm)
 * @desc Filename of video inside "movies/" directory. Include the extension. Must be webm or mp4 
 * @arg optionsLoop
 * @type boolean
 * @text Should Loop? (true/false)
 * @desc Should the video loop?
 * @default true
 * @arg optionsAutoUnload
 * @type boolean
 * @text Should Auto Unload? (true/false)
 * @desc Should the video auto unload when finished?
 * @default false
 *
 * @command play
 * @text Play video by id
 * @desc Play video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 *
 * @command stop
 * @text Stop video by id
 * @desc Stop video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 *
 * @command unload
 * @text Unload video by id
 * @desc Unload video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command pause
 * @text Pause video by id
 * @desc Pause video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command resume
 * @text Resume video by id
 * @desc Resume video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command setAutoUnload
 * @text Set video auto unload by id
 * @desc Set video auto unload by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command setLoop
 * @text Set video loop by id
 * @desc Set video loop by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 */

(function() {
    const pluginVersion = "1.1.0";
    const developerName = "NIJI";
    const developerPluginName = "VideoPlayer";
    const pluginName = `${developerName}_${developerPluginName}`;
    
    // Establish developer root
    window.Niji = window.Niji || {};
    window.Niji.videoMap = {};

    //=============================================================================
    // ** Command Registration
    //=============================================================================
    PluginManager.registerCommand(pluginName, "load", args => {
        Video.load(args.id, args.filename, {
            shouldLoop: args.optionsLoop, 
            shouldAutoUnload: args.optionsAutoUnload
        });
    });

    PluginManager.registerCommand(pluginName, "play", args => {
        Video.play(args.id);
    });

    PluginManager.registerCommand(pluginName, "stop", args => {
        Video.stop(args.id);
    });

    PluginManager.registerCommand(pluginName, "pause", args => {
        Video.pause(args.id);
    });

    PluginManager.registerCommand(pluginName, "resume", args => {
        Video.resume(args.id);
    });

    PluginManager.registerCommand(pluginName, "unload", args => {
        Video.unload(args.id);
    });

    PluginManager.registerCommand(pluginName, "setAutoUnload", args => {
        Video.setAutoUnload(args.id);
    });

    PluginManager.registerCommand(pluginName, "setLoop", args => {
        Video.setLoop(args.id);
    });

    //=============================================================================
    // ** Update Spriteset_Base
    //=============================================================================
    const _createUpperLayer = Spriteset_Base.prototype.createUpperLayer

    Spriteset_Base.prototype.createUpperLayer = function () {
        this.createVideos()
        _createUpperLayer.call(this)
    }

    Spriteset_Base.prototype.createVideos = function () {
        this._videosContainer = new Sprite()
        this.addChild(this._videosContainer)
    }

    const ensureVideoOverlay = () => {
        const scene = SceneManager._scene;
        if (!scene) return null;
        if (!scene._videoOverlay) {
            scene._videoOverlay = new Sprite();
            // Insert just below the window layer so dialogue/windows appear above videos
            const winLayer = scene._windowLayer;
            const idx = winLayer ? scene.children.indexOf(winLayer) : -1;
            if (idx >= 0) {
                scene.addChildAt(scene._videoOverlay, idx);
            } else {
                scene.addChild(scene._videoOverlay);
            }
        }
        return scene._videoOverlay;
    }

    Spriteset_Base.prototype.addVideo = function (video) {
        const overlay = ensureVideoOverlay();
        if (overlay) overlay.addChild(video);
    }

    Spriteset_Base.prototype.removeVideo = function (video) {
        const overlay = SceneManager._scene && SceneManager._scene._videoOverlay;
        if (overlay) overlay.removeChild(video);
    }
    
    //=============================================================================
    // ** Video Class
    //=============================================================================
    class Video {
        static load (id, name, { 
            shouldLoop = false, 
            shouldAutoUnload = false
        } = {}) {
            if (window.Niji.videoMap[id]) {
                console.log(pluginName, `Video with id (${id}) already exists.`, window.Niji.videoMap[id]);
                return;
            }

            let video = PIXI.Sprite.from(`movies/${name}`);

            video._id = id;
            video.__promises = [];
            video.__animations = [];
            video._texture.baseTexture.on('loaded', () => {
                video._loaded = true;
                video._source = video._texture.baseTexture.resource.source;
                video._source.loop = shouldLoop;
                video._source.muted = false;
                video._source.volume = 1;
                fitToScreen(video);
                if (video.__promises.length) {
                    for (const fn of video.__promises) {
                        fn(video);
                    }
                }
            });

            video.update = () => {
                video._texture.update();
                if (video.__animations.length) {
                    let animations = video.__animations[0];

                    // Iterate over the animations and play them.
                    for (let i = 0; i < animations.length; i++) {
                        const animation = animations[i];
                        if (VideoAnimations[animation.type]) {
                            VideoAnimations[animation.type](video, animations[i]);
                            if (window.Niji.debug) console.log(pluginName, `[update]`, animations[i].duration)
                        }
                    }

                    // Check for empty durations, remove if they exist
                    for (let i = animations.length - 1; i >= 0 ; i--) {
                        if (animations[i].duration <= 0) {
                            if (window.Niji.debug) console.log(pluginName, `[update]`, `Animations queue item has finished, removing.`)
                            animations.splice(i, 1);
                        }
                    }
                    
                    // If the animation array is empty, remove it
                    if (!animations.length) {
                        if (window.Niji.debug) console.log(pluginName, `[update]`, `Animations queue entry is empty, removing.`)
                        video.__animations.splice(0, 1);
                    }
                }
            }

            if (shouldAutoUnload) {
                Video.setAutoUnload(id);
            }

            window.Niji.videoMap[id] = video;

            return video;
        }


        static get (from, reference) {
            let video = null;

            if (typeof reference === 'object') {
                video = reference;
            } else {
                video = window.Niji.videoMap[reference];
            }

            if (!video) {
                console.log(pluginName, `[${from}]`, `No video with id ${reference} was found.`)
                return;
            }

            return video;
        }

        static setAutoUnload (id) {
            let video = Video.get("setAutoUnload", id);
            if (!video) return;

            video._texture.baseTexture.on('ended', () => {
                Video.unload(id);
            });
        }

        static setLoop (id) {
            let video = Video.get("setLoop", id);
            if (!video) return;

            invoke(video, () => {
                video._source.loop = true;
            });
        }

        static animate (id, animations) {
            let video = Video.get("animate", id);
            if (!video) return;

            invoke(video, () => {
                video.__animations.push(animations)
            });
        }

        static opacity (id, o) {
            let video = Video.get("opacity", id);
            if (!video) return;

            invoke(video, () => {
                video.alpha = o;
            });
        }

        static opacityAnim (id, opacity, duration) {
            let video = Video.get("opacityAnim", id);
            if (!video) return;

            video.__animations.push([{ type: 'opacity', duration, opacity }]);
        }


        static play (id, shouldAutoUnload = false) {
            let video = Video.get("play", id);
            if (!video) return;

            // check to see if the video was loaded and is already laying
            if (video._source && video._source.paused) {
                if (window.Niji.debug) console.log(pluginName, `[play]`, `Video ${id} already playing.`)
                return;
            } else {
                if (window.Niji.debug) console.log(pluginName, `[play]`, `Playing video ${id}.`)
                invoke(video, () => {
                    try {
                        // try and remove it before adding it
                        SceneManager._scene._spriteset.removeVideo(video);
                    } catch (e) {}
                    SceneManager._scene._spriteset.addVideo(video);
                    fitToScreen(video);
                    video._source.play();
                    if (shouldAutoUnload) Video.setAutoUnload(id);
                })
            }
        }

        static pause (id) {
            let video = Video.get("pause", id);
            if (!video) return;

            invoke(video, () => {
                video._source.pause()
            })
        }

        static resume (id) {
            let video = Video.get("resume", id);
            if (!video) return;

            invoke(video, () => {
                video._source.play()
            })
        }

        static stop (id) {
            let video = Video.get("stop", id);
            if (!video) return;
            
            invoke(video, () => {
                SceneManager._scene._spriteset.removeVideo(video)
                video._source.pause()
            })
        }

        static seek (id, seconds) {
            let video = Video.get("seek", id);
            if (!video) return;
            if (window.Niji.debug) console.log(pluginName, `[seek]`, `Video ${id} seeked to ${seconds} seconds.`)
            video._source.currentTime = seconds;
        }

        static unload (id) {
            let video = Video.get("unload", id);
            if (!video) return;

            invoke(video, () => {
                try {
                    SceneManager._scene._spriteset.removeVideo(video);
                } catch (e) {}
                try {
                    video._source.pause();
                    video._texture.baseTexture.destroy();
                    video._texture.destroy();
                    video.destroy();
                } catch (e) {
                    console.log(e);
                }

                try {
                    delete window.Niji.videoMap[video._id];
                } catch (e) {
                    console.log(e);
                }
            });
        }

        static isPlaying (id) {
            let video = Video.get("isPlaying", id);
            if (!video) return;
            return video._source.paused ? false : true;
        }

        static isReady () {
            return !Object.values(window.Niji.videoMap).some((video) => !video._loaded)
        }

        //=============================================================================
        // * Class Style
        //=============================================================================
        constructor (id, name, { 
            shouldLoop = false, 
            shouldAutoUnload = false
        } = {}) {
            this.video = Video.load(id, name, {
                shouldLoop, 
                shouldAutoUnload 
            });
        }

        animate (animations) { Video.animate(this.video._id, animations); return this; }
        opacity (alpha) { Video.opacity(this.video._id, alpha); return this; }
        opacityAnim (alpha, duration) { Video.opacity(this.video._id, alpha, duration); return this; }
        play () { Video.play(this.video._id); return this; }
        pause () { Video.pause(this.video._id); return this; }
        resume () { Video.resume(this.video._id); return this; }
        stop () { Video.stop(this.video._id); return this; }
        seek (seconds) { Video.seek(this.video._id, seconds); return this; }
        unload () { Video.unload(this.video._id); return this; }
        isPlaying () { return Video.isPlaying(this.video._id); }
        isReady () { return Video.isReady(); }
        setAutoUnload (shouldAutoUnload) { Video.setAutoUnload(this.video._id, shouldAutoUnload); return this; }
        setLoop (shouldLoop) { Video.setLoop(this.video._id, shouldLoop); return this; }
    }

    //=============================================================================
    // * Invokation helper for when videos aren't loaded yet.
    //=============================================================================

    const invoke = (video, fn) => {
        if (!video._source) {
            video.__promises.push(fn)
        } else {
            fn(video);
        }
    }

    const fitToScreen = (video) => {
        video.x = 0;
        video.y = 0;
        video.width = Graphics.width;
        video.height = Graphics.height;
    }


    //=============================================================================
    // ** Video Animations
    //=============================================================================

    class VideoAnimations {
        static opacity (video, anim) {
            if (anim.duration <= 0) return;
            video.alpha = (video.alpha * (anim.duration - 1) + anim.opacity) / anim.duration;
            anim.duration--;
            return anim;
        }
    }

    window.Niji.Video = Video;
    window.Niji.Video.version = pluginVersion;

})();