
export default function (pageType) {
  if (!window.ga || !window.ga.getAll) {
    return false;
  }

  const ga_pageparams = location.search.indexOf('?') >= 0
    ? `${location.search}${
        pageType ? `&pt=${pageType}` : ''
      }`
    : pageType ? `&pt=${pageType}` : ''

  const glob_ga_pageparams = `${location.pathname}${ga_pageparams}`;

  ga('send', {
    hitType: 'pageview',
    page: glob_ga_pageparams
  });
}
