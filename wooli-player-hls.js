document.addEventListener("DOMContentLoaded", function () {
        const videoPlayer = document.getElementById("wooli-hls-video-player");
        const playerDiv = document.getElementById("wooli-hls-player");
        var qualitySelector = document.getElementById("quality-selector");
        var subtitleSelector = document.getElementById("subtitle-selector");
        var audioSelector = document.getElementById("audio-selector");
        var speedVSelector = document.getElementById("wooli-speed-player");

        const qualityButton = document.querySelector(".wooli-quality-ply");
        const subtitleButton = document.querySelector(".wooli-subtitle-ply");
        const audioButton = document.querySelector(".wooli-audio-ply");
        const speedVButton = document.querySelector(".wooli-speed-ply");
        const speedDisplay = document.querySelector(".wltv-speed-s7f");
        const speedPlayer = document.getElementById("wooli-speed-player");

        var currentTimeDisplay = document.getElementById("current-time");
        var totalTimeDisplay = document.getElementById("total-time");


        var progressBarContainer = document.getElementById(
          "progress-bar-container"
        );
        var progressBar = document.querySelector(".progress-bar");
        var bufferBar = document.querySelector(".buffer-bar");

        const volumeControl = document.getElementById("volume-control");
        const volumePercentage = document.getElementById("volume-percentage");
        const volumeIcon = document.getElementById("volume-wltv-d");
        const volumeIconF = document.querySelector("#volume-wltv-d i");

        const forwardButton = document.querySelector(".wltv-forward-player");
        const playPauseButton = document.querySelector(".wltv-playpause");
        const playPauseButtonC = document.getElementById("playPauseButton");
        const backwardButton = document.querySelector(".wltv-backward-player");

        const captureFrameButton =
          document.getElementById("captureFrameButton");

        const watermarkDiv = document.createElement("div");

        // Agregar la clase watermark-wooli-player al div
        watermarkDiv.classList.add("watermark-wooli-player");
        watermarkDiv.innerHTML =
          '<svg id="watermark" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 47" width="220" height="47"><style>.a {fill: #f5f5f5}</style><path fill-rule="evenodd" class="a" d="m154.9 2.9c0.7 0.7 1.3 1.6 0.8 2.6q-0.3 0.7-1 1.4-1.9 2-4.6 2.9c-1.2 0.4-2.7 0.6-3.5-0.5-0.8-1-1.1-2.6-1.1-3.9-0.1-1.5 0.1-3.4 1.1-4.7 0.9-1 2.4-0.8 3.5-0.4 1.8 0.5 3.5 1.3 4.8 2.6zm-104.6 26.5c0-9.6 7.3-16.5 17.4-16.5 10.1 0 17.4 6.9 17.4 16.5 0 9.5-7.3 16.6-17.4 16.6-10.1 0-17.4-7.1-17.4-16.6zm24.1 0c0-3.9-3-7-6.7-7-3.7 0-6.7 3.1-6.7 7 0 3.8 3 6.9 6.7 6.9 3.7 0 6.7-3.1 6.7-6.9zm13.8 0c0-9.6 7.3-16.5 17.4-16.5 10.1 0 17.4 6.9 17.4 16.5 0 9.5-7.3 16.6-17.4 16.6-10.1 0-17.4-7.1-17.4-16.6zm24.1 0c0-3.9-3-7-6.7-7-3.7 0-6.7 3.1-6.7 7 0 3.8 3 6.9 6.7 6.9 3.7 0 6.7-3.1 6.7-6.9zm15.6-26.7h10.8v42.2h-10.8zm55.7 32.8v9.4h-7.3c-6.9 0-11-4.1-11-11.1v-11.6h-5.7v-2.6l13.8-14.7h2.3v9h7.8v8.3h-7.5v9.8c0 2.2 1.3 3.5 3.6 3.5zm36.4-21.6l-12.5 31h-9.6l-12.7-31h11.7l5.9 18.3 5.7-18.3zm-201.3 31h-8.5c0 0-9.8-29.8-10.2-31q0 0 0-0.1h11.2c0 0.1 4.7 16.3 4.7 16.3 0 0 7.3-16.1 7.3-16.2q0.6-1.3 2-0.9c0.4 0.1 0.6 0.4 0.8 0.7 0.1 0.1 7.7 16.4 7.8 16.6 0.1 0 4.7-16.5 4.7-16.5h10.8q0.1 0 0.1 0.1l-10 31h-8.5c0 0-6.1-13.9-6.1-13.8-0.2 0.1-6.1 13.8-6.1 13.8zm126.7-30.5c0-0.3 0.3-0.6 0.6-0.6h9.5c0.3 0 0.6 0.3 0.6 0.6v29.9c0 0.3-0.3 0.6-0.6 0.6h-9.5c-0.3 0-0.6-0.3-0.6-0.6z"></path></svg>';
        playerDiv.appendChild(watermarkDiv);

        // Función para capturar el fotograma actual y descargarlo como imagen
        function captureFrame() {
          // Crear un lienzo (canvas) del tamaño del video
          const canvas = document.createElement("canvas");
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;

          // Dibujar el fotograma actual en el lienzo
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

          // Convertir el lienzo a una imagen y descargarla
          const downloadLink = document.createElement("a");
          downloadLink.href = canvas.toDataURL("image/png");
          downloadLink.download = "wooli-hls-frame.png";
          downloadLink.click();
        }

        // Agregar evento click al botón de captura de fotogramas
        captureFrameButton.addEventListener("click", captureFrame);
        const pipButton = document.getElementById("pipButton");

        // Agregar evento de clic al botón PIP
        pipButton.addEventListener("click", () => {
          if (document.pictureInPictureElement) {
            // Si ya está en modo PIP, salir del modo PIP
            document.exitPictureInPicture().catch((error) => {
              console.error(
                "Error al salir del modo Picture-in-Picture:",
                error
              );
            });
          } else {
            // Si no está en modo PIP, solicitar entrar al modo PIP
            videoPlayer.requestPictureInPicture().catch((error) => {
              console.error(
                "Error al entrar al modo Picture-in-Picture:",
                error
              );
            });
          }
        });

        // Evento para actualizar el estado del botón cuando se entra o sale del modo PIP
        videoPlayer.addEventListener("enterpictureinpicture", () => {
          pipButton.innerHTML = '<i class="wltv-pip-i"></i>';
        });

        videoPlayer.addEventListener("leavepictureinpicture", () => {
          pipButton.innerHTML = '<i class="wltv-pip-out-i"></i>';
        });

        const controlsPlayWooli = document.querySelector(
          ".controls-play-wooli"
        );
        const wooliHlsControls = document.querySelector(".wooli-hls-controls");

        // Función para ocultar los controles y el cursor
        function hideControlsAndCursor() {
          wooliHlsControls.classList.add("controls-hidden");
          controlsPlayWooli.classList.add("controlsPlay-hidden");
          playerDiv.style.cursor = "none";
        }

        // Función para mostrar los controles y el cursor
        function showControlsAndCursor() {
          wooliHlsControls.classList.remove("controls-hidden");
          controlsPlayWooli.classList.remove("controlsPlay-hidden");
          playerDiv.style.cursor = "auto";
        }

        // Establecer temporizador para ocultar los controles después de 3 segundos
        let timer;

        playerDiv.addEventListener("mousemove", function () {
          clearTimeout(timer);
          showControlsAndCursor();
          timer = setTimeout(hideControlsAndCursor, 3000);
        });

        // Evento para ocultar los controles y el cursor al cargar la página
        hideControlsAndCursor();

        var selectedButton = null;

        //
        videoPlayer.controls = false;

        // Deshabilitar menú contextual del clic derecho
        videoPlayer.addEventListener("contextmenu", function (event) {
          event.preventDefault(); // Previene que aparezca el menú contextual
        });
        // Función para avanzar 10 segundos
        forwardButton.addEventListener("click", function () {
          videoPlayer.currentTime += 10;
        });

        // Función para pausar o reproducir el video
        function togglePlayPause() {
          if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.innerHTML = '<i class="wltv-pause-i"></i>';
            playPauseButtonC.innerHTML = '<i class="wltv-pause-i"></i>';
          } else {
            videoPlayer.pause();
            playPauseButton.innerHTML = '<i class="wltv-play-i"></i>';
            playPauseButtonC.innerHTML = '<i class="wltv-play-i"></i>';
          }
        }

        // Agregar evento click a ambos botones de play/pause
        playPauseButton.addEventListener("click", togglePlayPause);
        playPauseButtonC.addEventListener("click", togglePlayPause);

        // Función para retroceder 10 segundos
        backwardButton.addEventListener("click", function () {
          videoPlayer.currentTime -= 10;
        });

        // Set initial volume
        videoPlayer.volume = volumeControl.value / 100;

        // Update volume icon
        function updateVolumeIcon() {
          const volume = parseInt(volumeControl.value, 10);
          if (volume === 0) {
            volumeIconF.className = "wltv-volume-x";
          } else if (volume > 50) {
            volumeIconF.className = "wltv-volume-2";
          } else {
            volumeIconF.className = "wltv-volume-i";
          }
        }

        // Update volume when slider changes
        volumeControl.addEventListener("input", function () {
          const volume = parseFloat(volumeControl.value) / 100;
          videoPlayer.volume = volume;
          volumePercentage.textContent = volumeControl.value;
          updateVolumeIcon();
          updateVolumeRangeColor(volumeControl.value);
        });

        // Toggle mute/unmute on volume icon click
        volumeIcon.addEventListener("click", function () {
          if (videoPlayer.volume === 0) {
            // Establecer el volumen al valor anterior o al valor predeterminado si es cero
            videoPlayer.volume =
              volumeControl.value > 0 ? volumeControl.value / 100 : 0.5;
            volumeControl.value = videoPlayer.volume * 100;
          } else {
            // Mute
            videoPlayer.volume = 0;
            volumeControl.value = 0;
          }
          volumePercentage.textContent = volumeControl.value;
          updateVolumeIcon();
          updateVolumeRangeColor(volumeControl.value);
        });

        // Función para actualizar el color de la barra de volumen
        function updateVolumeRangeColor(value) {
          volumeControl.style.background = `linear-gradient(to right, #f6256b 0%, #f53851 ${value}%, #ffffff70 ${value}%, #ffffff70 100%)`;
        }

        // Llamamos a la función para actualizar el color de la barra de volumen inicialmente
        updateVolumeRangeColor(volumeControl.value);

        const progressTime = document.getElementById("progress-time");

        // Actualizar el tiempo mientras el mouse se mueve sobre la barra de progreso
        progressBarContainer.addEventListener("mousemove", function (event) {
          const rect = progressBarContainer.getBoundingClientRect();
          let x = event.clientX - rect.left;
          const width = progressBarContainer.clientWidth * 0.97; // Reducir el ancho para evitar desbordamiento

          // Limitar la posición x al área de la barra de progreso
          x = Math.max(0, Math.min(x, width));

          const duration = videoPlayer.duration;
          const currentTime = (x / width) * duration;
          progressTime.style.left = `${x}px`;
          progressTime.textContent = formatTime(currentTime);
        });

        // Mostrar el tiempo al pasar el mouse sobre la barra de progreso
        progressBarContainer.addEventListener("mouseenter", function (event) {
          progressTime.style.opacity = "1";
        });

        // Ocultar el tiempo al sacar el mouse de la barra de progreso
        progressBarContainer.addEventListener("mouseleave", function (event) {
          progressTime.style.opacity = "0";
        });

        // Actualizar la barra de progreso y la barra de búfer
        function updateProgressBar(event) {
          var rect = progressBarContainer.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var width = rect.width;
          var percentage = (x / width) * 100;
          progressBar.style.width = percentage + "%";
          var currentTime = (percentage / 100) * videoPlayer.duration;
          videoPlayer.currentTime = currentTime;
        }

        progressBarContainer.addEventListener("mousedown", function (event) {
          updateProgressBar(event);
          window.addEventListener("mousemove", updateProgressBar);
        });

        window.addEventListener("mouseup", function () {
          window.removeEventListener("mousemove", updateProgressBar);
        });

        progressBarContainer.addEventListener("touchstart", function (event) {
          updateProgressBar(event.touches[0]);
          window.addEventListener("touchmove", function (event) {
            updateProgressBar(event.touches[0]);
          });
        });

        window.addEventListener("touchend", function () {
          window.removeEventListener("touchmove", updateProgressBar);
        });

        //
        videoPlayer.addEventListener("loadedmetadata", function () {
          totalTimeDisplay.textContent = formatTime(videoPlayer.duration);
        });

        videoPlayer.addEventListener("timeupdate", function () {
          currentTimeDisplay.textContent = formatTime(videoPlayer.currentTime);

          // Actualizar la barra de progreso
          const percentage =
            (videoPlayer.currentTime / videoPlayer.duration) * 100;
          progressBar.style.width = percentage + "%";
        });

        function formatTime(time) {
          const hours = Math.floor(time / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = Math.floor(time % 60);

          let formattedTime = "";

          if (hours > 0) {
            formattedTime += `${String(hours).padStart(2, "0")}:`;
          }

          formattedTime += `${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`;

          return formattedTime;
        }

        //

        speedPlayer.addEventListener("click", function (event) {
          if (event.target.tagName === "BUTTON") {
            const buttons = speedPlayer.querySelectorAll("button");
            buttons.forEach((button) => button.classList.remove("selected"));

            const selectedButton = event.target;
            selectedButton.classList.add("selected");

            const playbackRate = parseFloat(selectedButton.textContent);
            videoPlayer.playbackRate = playbackRate;

            // Formatear la velocidad seleccionada con dos decimales si es necesario
            const formattedPlaybackRate =
              playbackRate % 1 === 0
                ? playbackRate.toFixed(1)
                : playbackRate.toFixed(2);
            speedDisplay.textContent = `${formattedPlaybackRate}X`;
          }
        });

        // Actualizar la barra de búfer
        videoPlayer.addEventListener("progress", function () {
          if (videoPlayer.duration > 0) {
            for (var i = 0; i < videoPlayer.buffered.length; i++) {
              if (
                videoPlayer.buffered.start(
                  videoPlayer.buffered.length - 1 - i
                ) < videoPlayer.currentTime
              ) {
                var bufferEnd = videoPlayer.buffered.end(
                  videoPlayer.buffered.length - 1 - i
                );
                var bufferPercent = (bufferEnd / videoPlayer.duration) * 100;
                bufferBar.style.width = bufferPercent + "%";
                break;
              }
            }
          }
        });
        //
        const fullscreenButton = document.querySelector(".wltv-screen-ex");
        const fullscreenIcon = fullscreenButton.querySelector("#screen-web");

        // Función para cambiar el ícono del botón
        // Función para cambiar el ícono del botón
        function toggleFullscreenIcon(isFullscreen) {
          if (isFullscreen) {
            fullscreenIcon.classList.remove("wltv-fullscreen-i");
            fullscreenIcon.classList.add("wltv-outscreen-i");
          } else {
            fullscreenIcon.classList.remove("wltv-outscreen-i");
            fullscreenIcon.classList.add("wltv-fullscreen-i");
          }
        }

        // Manejar el evento click del botón de pantalla completa
        fullscreenButton.addEventListener("click", () => {
          if (!document.fullscreenElement) {
            if (playerDiv.requestFullscreen) {
              playerDiv.requestFullscreen();
            } else if (playerDiv.webkitRequestFullscreen) {
              // Safari
              playerDiv.webkitRequestFullscreen();
            } else if (playerDiv.msRequestFullscreen) {
              // IE11
              playerDiv.msRequestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
              // Safari
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              // IE11
              document.msExitFullscreen();
            }
          }
        });

        // Manejar el cambio de estado de pantalla completa
        document.addEventListener("fullscreenchange", () => {
          const isFullscreen = !!document.fullscreenElement;
          toggleFullscreenIcon(isFullscreen);
        });

        document.addEventListener("webkitfullscreenchange", () => {
          // Safari
          const isFullscreen = !!document.webkitFullscreenElement;
          toggleFullscreenIcon(isFullscreen);
        });

        document.addEventListener("msfullscreenchange", () => {
          // IE11
          const isFullscreen = !!document.msFullscreenElement;
          toggleFullscreenIcon(isFullscreen);
        });
        //

        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoPlayer.src);
          hls.attachMedia(videoPlayer);

          //

          // Verificar si el video HLS está en vivo
          function isLiveHLSVideo() {
            return (
              hls &&
              hls.config &&
              hls.config.liveSyncDurationCount !== undefined
            );
          }

          hls.on(Hls.Events.LIVE_BACK_BUFFER_REACHED, function () {
            console.log("El video está en vivo");
          });

          hls.on(Hls.Events.LIVE_BACK_BUFFER_REACHED, function () {
            console.log("El video no está en vivo");
          });
          //

          const elements = {
            quality: { btn: qualityButton, content: qualitySelector },
            subtitle: { btn: subtitleButton, content: subtitleSelector },
            audio: { btn: audioButton, content: audioSelector },
            speed: { btn: speedVButton, content: speedVSelector },
          };

          for (const [name, { btn, content }] of Object.entries(elements)) {
            btn.addEventListener("click", () => {
              toggleElement(content);
              toggleElement(btn);
              closeOtherElements(name);
            });
          }

          function toggleElement(element) {
            element.classList.toggle("active");
          }

          function closeOtherElements(except) {
            for (const [name, { btn, content }] of Object.entries(elements)) {
              if (name !== except && content.classList.contains("active")) {
                content.classList.remove("active");
                btn.classList.remove("active");
              }
            }
          }

          // Agregar evento de clic en cualquier parte del documento
          document.addEventListener("click", (event) => {
            const target = event.target;
            // Si el clic no es en ninguno de los botones ni en los selectores, eliminamos la clase "active" de todos los elementos
            if (
              !target.closest(".wooli-quality-ply") &&
              !target.closest(".wooli-subtitle-ply") &&
              !target.closest(".wooli-audio-ply") &&
              !target.closest(".wooli-speed-ply") &&
              !target.closest(".quality-selector") &&
              !target.closest(".subtitle-selector") &&
              !target.closest(".audio-selector") &&
              !target.closest(".speed-selector")
            ) {
              for (const [, { btn, content }] of Object.entries(elements)) {
                content.classList.remove("active");
                btn.classList.remove("active");
              }
            }
          });

          //

          const qualitySpan = document.querySelector(".wltv-qualityWd");

          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            var qualityLevels = hls.levels.map(function (level) {
              return convertToReadableQuality(
                level.width,
                level.height,
                level.bitrate
              );
            });

            if (qualityLevels) {
              qualityLevels.forEach(function (qualityData, index) {
                var qualityButton = document.createElement("button");
                qualityButton.textContent = qualityData.quality;

                var speedSpan = document.createElement("span");
                speedSpan.classList.add("speed-wltv");
                speedSpan.textContent = qualityData.speed;

                qualityButton.appendChild(speedSpan);
                qualityButton.addEventListener("click", function () {
                  // Remover la clase "selected" de todos los botones de calidad
                  document
                    .querySelectorAll("#quality-selector button")
                    .forEach(function (button) {
                      button.classList.remove("selected");
                    });

                  // Agregar la clase "selected" al botón clicado
                  qualityButton.classList.add("selected");

                  // Actualizar el span con la calidad seleccionada
                  qualitySpan.textContent = qualityData.quality;

                  if (index === -1) {
                    hls.nextLevel = -1;
                  } else {
                    hls.nextLevel = index;
                  }
                });
                qualitySelector.appendChild(qualityButton);
              });

              var autoButton = document.createElement("button");
              autoButton.textContent = "Auto";
              var currentQualityDisplay = document.createElement("div");
              autoButton.appendChild(currentQualityDisplay);
              autoButton.addEventListener("click", function () {
                // Remover la clase "selected" de todos los botones de calidad
                document
                  .querySelectorAll("#quality-selector button")
                  .forEach(function (button) {
                    button.classList.remove("selected");
                  });

                // Agregar la clase "selected" al botón "Auto"
                autoButton.classList.add("selected");

                // Actualizar el span con la calidad seleccionada
                qualitySpan.textContent = "Auto";

                hls.nextLevel = -1;
                var currentQuality = convertToReadableQuality(
                  hls.levels[hls.currentLevel].width,
                  hls.levels[hls.currentLevel].height,
                  hls.levels[hls.currentLevel].bitrate
                );
                currentQualityDisplay.textContent = currentQuality;
              });

              // Agregar la clase "selected" al botón "Auto" por defecto
              autoButton.classList.add("selected");
              qualitySelector.appendChild(autoButton);

              hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
                if (autoButton.classList.contains("selected")) {
                  var currentQuality = convertToReadableQuality(
                    hls.levels[data.level].width,
                    hls.levels[data.level].height
                  );
                  autoButton.innerHTML =
                    'Auto <span class="quality-wltv">(' +
                    currentQuality.quality +
                    ")</span>";
                  currentQualityDisplay.textContent = currentQuality.quality;
                  // Actualizar el span con la calidad seleccionada cuando se cambia automáticamente a "Auto"
                  qualitySpan.textContent =
                    "Auto (" + currentQuality.quality + ")";
                }
              });
            } else {
              qualitySelector.textContent = "No hay calidades disponibles";
            }
          });

          hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function (event, data) {
            var subtitleTracks = data.subtitleTracks;
            if (subtitleTracks && subtitleTracks.length > 1) {
              // Mostrar el botón si hay más de un subtítulo disponible
              subtitleButton.style.display = "flex";
              subtitleSelector.innerHTML = "";
              var addedTracks = {};
              console.log("Subtítulos disponibles:");

              // Crear botón OFF (desactivado por defecto)
              var noneButton = document.createElement("button");
              noneButton.textContent = "OFF";
              noneButton.addEventListener("click", function () {
                hls.subtitleTrack = -1;
                document
                  .querySelectorAll("#subtitle-selector button")
                  .forEach(function (button) {
                    button.classList.remove("selected");
                  });
                noneButton.classList.add("selected");
              });
              noneButton.classList.add("selected"); // Agregar la clase "selected" por defecto
              subtitleSelector.appendChild(noneButton);

              subtitleTracks.forEach(function (track, index) {
                if (!addedTracks[track.name]) {
                  console.log(index + ": " + track.name);
                  var subtitleButton = document.createElement("button");
                  subtitleButton.textContent = track.name;
                  subtitleButton.addEventListener("click", function () {
                    hls.subtitleTrack = track.id;
                    document
                      .querySelectorAll("#subtitle-selector button")
                      .forEach(function (button) {
                        button.classList.remove("selected");
                      });
                    subtitleButton.classList.add("selected");
                  });
                  subtitleSelector.appendChild(subtitleButton);
                  addedTracks[track.name] = true;
                }
              });
            } else {
              // Ocultar el botón si no hay más de un subtítulo disponible
              subtitleButton.style.display = "none";
              subtitleSelector.textContent = "No hay subtítulos disponibles.";
            }
          });

          // Verificar si el botón ya se encuentra oculto por falta de subtítulos
          if (!hls.subtitleTracks || hls.subtitleTracks.length <= 1) {
            subtitleButton.style.display = "none";
          }

          hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, function (event, data) {
            var audioTracks = data.audioTracks;
            if (audioTracks && audioTracks.length > 1) {
              // Mostrar el botón si hay más de un audio disponible
              audioButton.style.display = "flex";
              audioSelector.innerHTML = "";
              var addedTracks = {};
              console.log("Pistas de audio disponibles:");
              audioTracks.forEach(function (track, index) {
                if (!addedTracks[track.name]) {
                  console.log(index + ": " + track.name);
                  var audioButton = document.createElement("button");
                  audioButton.textContent = track.name;
                  audioButton.addEventListener("click", function () {
                    hls.audioTrack = track.id;
                    document
                      .querySelectorAll("#audio-selector button")
                      .forEach(function (button) {
                        button.classList.remove("selected");
                      });
                    audioButton.classList.add("selected");
                  });
                  audioSelector.appendChild(audioButton);
                  addedTracks[track.name] = true;

                  if (track.id === videoPlayer.audioTrack) {
                    audioButton.classList.add("selected");
                  }
                }
              });
            } else {
              // Ocultar el botón si no hay más de un audio disponible
              audioButton.style.display = "none";
              audioSelector.textContent = "No hay pistas de audio disponibles.";
            }
          });

          // Verificar si el botón ya se encuentra oculto por falta de pistas de audio
          if (!hls.audioTracks || hls.audioTracks.length <= 1) {
            audioButton.style.display = "none";
          }

          hls.on(Hls.Events.AUDIO_TRACK_SWITCHING, function (event, data) {
            var currentTrack = hls.audioTracks[data.id];

            var audioButtons = document.querySelectorAll(
              "#audio-selector button"
            );
            audioButtons.forEach(function (button) {
              if (button.textContent === currentTrack.name) {
                audioButtons.forEach(function (btn) {
                  btn.classList.remove("selected");
                });
                button.classList.add("selected");
              }
            });
          });
        } else {
          qualitySelector.textContent =
            "El navegador no es compatible con la reproducción de HLS.";
        }
      });

      function convertToReadableQuality(width, height, bitrate) {
        var quality = "";
        var speed = "";

        if (width >= 7680 && height >= 4320) {
          quality = "8K";
        } else if (width >= 3840 && height >= 2160) {
          quality = "4K";
        } else if (width >= 2560 && height >= 1440) {
          quality = "2K";
        } else if (width >= 1920 && height >= 1080) {
          quality = "1080p";
        } else if (width >= 1280 && height >= 720) {
          quality = "720p";
        } else if (width >= 854 && height >= 480) {
          quality = "480p";
        } else if (width >= 640 && height >= 360) {
          quality = "360p";
        } else if (width >= 426 && height >= 240) {
          quality = "240p";
        } else if (width >= 256 && height >= 144) {
          quality = "144p";
        } else {
          quality = "HD";
        }

        if (bitrate) {
          var kbps = bitrate / 1000;
          if (kbps >= 1000) {
            speed = Math.round(kbps / 1000) + " Mbps";
          } else {
            speed = Math.round(kbps) + " Kbps";
          }
        }

        return { quality: quality, speed: speed };
      }