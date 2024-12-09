export class VideoToFrames {
  /**
   * Extracts frames from a video based on the given FPS.
   * @param videoUrl URL of the video file (HTML5-compatible, e.g., MP4).
   * @param fps Frames per second to extract.
   * @param outputType Output format for frames: "base64", "blob", or "imageData". Default is "base64".
   * @returns A Promise resolving to an array of extracted frames in the specified format.
   */
  public static extractFrames(
    videoUrl: string,
    fps: number,
    outputType: "base64" | "blob" | "imageData" = "base64"
  ): Promise<(string | Blob | ImageData)[]> {
    return new Promise((resolve, reject) => {
      if (fps <= 0) {
        reject("FPS must be greater than 0.");
        return;
      }

      const frames: (string | Blob | ImageData)[] = [];
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const video = document.createElement("video");

      video.preload = "metadata";
      video.crossOrigin = "anonymous"; // Allow cross-origin videos if permissions are granted
      video.src = videoUrl;

      video.addEventListener("loadedmetadata", async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const duration = video.duration;
        const totalFrames = Math.floor(duration * fps);

        if (totalFrames <= 0) {
          reject("No frames to extract. Check your FPS or video duration.");
          return;
        }

        for (let i = 0; i < totalFrames; i++) {
          const time = i / fps;
          try {
            const frame = await this.getFrame(video, context, canvas, time, outputType);
            frames.push(frame);
          } catch (err) {
            reject(`Error extracting frame at time ${time}: ${err}`);
            return;
          }
        }

        resolve(frames);
      });

      video.addEventListener("error", () =>
        reject("Error loading video. Check the URL and format.")
      );

      video.load();
    });
  }

  private static getFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    outputType: "base64" | "blob" | "imageData"
  ): Promise<string | Blob | ImageData> {
    return new Promise((resolve, reject) => {
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        try {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          switch (outputType) {
            case "base64":
              resolve(canvas.toDataURL());
              break;
            case "blob":
              canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject("Failed to convert frame to Blob.");
              });
              break;
            case "imageData":
              resolve(context.getImageData(0, 0, canvas.width, canvas.height));
              break;
            default:
              reject(`Unsupported output type: ${outputType}`);
          }
        } catch (err) {
          reject(`Error processing frame: ${err}`);
        }
      };

      video.addEventListener("seeked", onSeeked);
      video.currentTime = time;
    });
  }
}
