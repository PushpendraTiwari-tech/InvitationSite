/*
 * Video Block
 * Reusable block for local or embedded video content
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-container';

    const sourceCell = row.children[0];
    const captionCell = row.children[1];
    const source = sourceCell?.textContent?.trim() || '';

    if (source) {
      const videoUrl = source.startsWith('http') ? source : `/${source.replace(/^\//, '')}`;

      if (/\.(mp4|webm|ogg)(\?|$)/i.test(videoUrl)) {
        const video = document.createElement('video');
        video.className = 'video-element';
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';

        const sourceEl = document.createElement('source');
        sourceEl.src = videoUrl;
        sourceEl.type = 'video/mp4';
        if (videoUrl.toLowerCase().includes('.webm')) sourceEl.type = 'video/webm';
        if (videoUrl.toLowerCase().includes('.ogg')) sourceEl.type = 'video/ogg';
        video.append(sourceEl);
        wrapper.append(video);
      } else {
        const iframe = document.createElement('iframe');
        iframe.className = 'video-iframe';
        iframe.src = videoUrl;
        iframe.title = 'Video content';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        wrapper.append(iframe);
      }
    }

    if (captionCell) {
      const caption = document.createElement('p');
      caption.className = 'video-caption';
      caption.append(...captionCell.childNodes);
      wrapper.append(caption);
    }

    row.replaceWith(wrapper);
  });
}
