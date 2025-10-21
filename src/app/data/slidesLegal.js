export function getSlides(t) {
    return Array.from({ length: 10 }, (_, i) => {
        const id = i + 1;
        return {
            id,
            title: t(`${id}.title`),
            description: t(`${id}.description`),
            footnotes: t.raw(`${id}.footnotes`),
            links: t.raw(`${id}.links`),
        };
    });
}
