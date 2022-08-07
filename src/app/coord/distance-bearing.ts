/**
 * Class that contains a distance and bearing.
 */
export class DistanceBearing {

  /**
   * Constructor.
   * 
   * @param distance
   * @param initialBearing
   * @param finalBearing
   */
  constructor(public distance: number = 0, public initialBearing: number = 0, public finalBearing: number = 0) {
  }
}
