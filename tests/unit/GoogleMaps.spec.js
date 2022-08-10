/* eslint-disable no-undef */
import {
  initialize,
  Map,
  Marker,
  Polygon,
  mockInstances,
} from "@googlemaps/jest-mocks";

beforeEach(() => {
  initialize();
});

test("my test", () => {
  const map = new google.maps.Map(null);
  const markerOne = new google.maps.Marker();
  const markerTwo = new google.maps.Marker();

  map.setHeading(8);
  markerOne.setMap(map);
  markerTwo.setLabel("My marker");

  const mapMocks = mockInstances.get(Map);
  const markerMocks = mockInstances.get(Marker);

  expect(mapMocks).toHaveLength(1);
  expect(markerMocks).toHaveLength(2);
  expect(mapMocks[0].setHeading).toHaveBeenCalledWith(8);
  expect(markerMocks[0].setMap).toHaveBeenCalledTimes(1);
  expect(markerMocks[1].setLabel).toHaveBeenCalledWith("My marker");
});
test("test polygon", () => {
  const map = new google.maps.Map(null);
  const polygonOne = new google.maps.Polygon();
  const polygonTwo = new google.maps.Polygon();

  map.setHeading(8);
  polygonOne.setMap(map);
  polygonTwo.setMap(map);

  const mapMocks = mockInstances.get(Map);
  const polygonMocks = mockInstances.get(Polygon);

  expect(mapMocks).toHaveLength(1);
  expect(polygonMocks).toHaveLength(2);
  expect(mapMocks[0].setHeading).toHaveBeenCalledWith(8);
  expect(polygonMocks[0].setMap).toHaveBeenCalledTimes(1);
});
beforeEach(() => {
  mockInstances.clearAll();
  mockInstances.clear(Map, Polygon, Marker);
});
