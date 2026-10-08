export default function decorate(block) {
  const items = [...block.children];

  block.classList.add('accordion');

  items.forEach((item, index) => {
    const children = [...item.children];
    if (children.length < 2) return;

    const titleEl = children[0];
    const contentEl = children[1];

    const wrapper = document.createElement('div');
    wrapper.className = 'accordion-item';
    if (index === 0) wrapper.classList.add('is-open');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'accordion-trigger';
    button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    button.innerHTML = `
      <span class="accordion-title">${titleEl.textContent.trim()}</span>
      <span class="accordion-icon" aria-hidden="true"></span>
    `;

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.hidden = index !== 0;
    panel.append(...contentEl.childNodes);

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
      wrapper.classList.toggle('is-open', !isOpen);
    });

    item.replaceWith(wrapper);
    wrapper.append(button, panel);
  });
}
