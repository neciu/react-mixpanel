import {jsdom} from 'jsdom';
import {XMLHttpRequest} from 'xmlhttprequest';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.XMLHttpRequest = XMLHttpRequest;
