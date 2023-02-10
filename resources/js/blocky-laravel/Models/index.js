import base from './base';
import primaryKey from './primaryKey';

import { stringToColor } from '../helper';

import nullable from './Addons/nullable';
import comment from './Addons/comment';
import autoIncrement from './Addons/autoIncrement';
import baseColumn from './baseColumn';

export const allAddons = [
    nullable,
    comment,
    autoIncrement
]

export default {
    name: "Models",
    colour: stringToColor("Models"),
    blocks: [
        base,
        primaryKey,
        baseColumn('bigInteger'),
        baseColumn('binary'),
        baseColumn('boolean'),
        baseColumn('char'),
        baseColumn('dateTimeTz'),
        baseColumn('dateTime'),
        baseColumn('date'),
        baseColumn('decimal'),
        baseColumn('double'),
        baseColumn('enum'),
        baseColumn('float'),
        baseColumn('geometryCollection'),
        baseColumn('geometry'),
        baseColumn('integer'),
        baseColumn('ipAddress'),
        baseColumn('json'),
        baseColumn('jsonb'),
        baseColumn('lineString'),
        baseColumn('longText'),
        baseColumn('macAddress'),
        baseColumn('mediumInteger'),
        baseColumn('mediumText'),
        baseColumn('morphs'),
        baseColumn('multiLineString'),
        baseColumn('multiPoint'),
        baseColumn('multiPolygon'),
        baseColumn('nullableMorphs'),
        baseColumn('nullableTimestamps'),
        baseColumn('nullableUlidMorphs'),
        baseColumn('nullableUuidMorphs'),
        baseColumn('point'),
        baseColumn('polygon'),
        baseColumn('rememberToken'),
        baseColumn('set'),
        baseColumn('smallInteger'),
        baseColumn('softDeletesTz'),
        baseColumn('softDeletes'),
        baseColumn('string'),
        baseColumn('text'),
        baseColumn('timeTz'),
        baseColumn('time'),
        baseColumn('timestampTz'),
        baseColumn('timestamp', false),
        baseColumn('timestampsTz'),
        baseColumn('timestamps'),
        baseColumn('tinyInteger'),
        baseColumn('tinyText'),
        baseColumn('unsignedBigInteger'),
        baseColumn('unsignedDecimal'),
        baseColumn('unsignedInteger'),
        baseColumn('unsignedMediumInteger'),
        baseColumn('unsignedSmallInteger'),
        baseColumn('unsignedTinyInteger'),
        baseColumn('ulidMorphs'),
        baseColumn('uuidMorphs'),
        baseColumn('ulid'),
        baseColumn('uuid'),
        baseColumn('year'),
        ...allAddons
    ]
}