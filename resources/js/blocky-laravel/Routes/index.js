import group from './group';
import controller from './controller';
import base from './base';
import closure from './closure';
import { stringToColor } from '../helper';

export default {
    name: "Routes",
    colour: stringToColor("Routes"),
    blocks: [
        group,
        controller,
        closure,
        base
    ]
}