'use strict';

const Component = () => (
  h('div', {className: "main"}, [
    h('input'),
    h('button', {onClick: () => console.log('yo')}, [" Submit "])
  ])
);

module.exports = Component;
