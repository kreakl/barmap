import { ensure, Predicate, TinyTypeOf } from 'tiny-types';

type Point = {
  type: 'Point';
  coordinates: number[];
};

export class Location extends TinyTypeOf<Point>() {
  constructor(public readonly location: Point) {
    super(location);
    ensure(
      'Location',
      location,
      Predicate.to('to be valid geojson Point', (value) =>
        this.isValidPoint(value),
      ),
    );
  }

  isValidPoint(point: Point) {
    const [longitude, latitude] = point.coordinates;
    return (
      longitude <= 180 && longitude >= -180 && latitude <= 90 && latitude >= -90
    );
  }
}
