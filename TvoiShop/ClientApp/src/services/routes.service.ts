import translationService from "./translation.service";

export function getRoute(path: string) {
    return `/${translationService.lang}/${path}`;
}