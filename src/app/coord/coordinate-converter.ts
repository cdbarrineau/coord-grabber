import { DistanceBearing } from './distance-bearing';

export class Geodetic {
  public latitude = 0;
  public longitude = 0;
}

export class Utm {
  public easting = 0;
  public northing = 0;
  public zone = 0;
  public zoneDesignator = '';
  public elevation = 0;
  public hemisphere = 'N';

  public toString() {
    return this.zone + this.zoneDesignator + ' ' + this.easting + 'E ' + this.northing + this.hemisphere;
  }
}


/**
 * Class used to convert coordinate to/from different coordinate formats.
 *
 */
export class CoordinateConverter {

  // Semi-major axis for WGS84.
  private static wgs84SemiMajorAxis = 6378137.0;

  // Semi-minor axis for WGS84.
  private static mgs84SemiMinorAxis = CoordinateConverter.wgs84SemiMajorAxis * (1 - (1.0 / 298.257223563));

  // First eccentricity for WGS84.
  private static firstEccentricity = 1 - ((CoordinateConverter.mgs84SemiMinorAxis * CoordinateConverter.mgs84SemiMinorAxis) / (CoordinateConverter.wgs84SemiMajorAxis * CoordinateConverter.wgs84SemiMajorAxis));

  // Second eccentricity for WGS84.
  private static secondEccentricity = ((CoordinateConverter.wgs84SemiMajorAxis * CoordinateConverter.wgs84SemiMajorAxis) / (CoordinateConverter.mgs84SemiMinorAxis * CoordinateConverter.mgs84SemiMinorAxis)) - 1;

  // We'll use this a lot so calculate it up front.
  private static PI_OVER_2 = Math.PI / 2.0;

  // cosine of 67.5 degrees.
  private static COS_67P5 = 0.38268343236508977;

  // Toms region 1 constant.
  private static AD_C = 1.0026000;

  // The set of zone characters for UTM and MGRs conversions
  private static GC_CHAR = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Supports conversions to UTM
  private static GC_GZ_BASE = [
    -1, -1, 1116918, 2008494,
    2899535, 3789860, 4679346, 5567932,
    -1, 6455631, 7342522, 8228746,
    9114496, 0, -1, 885504,
    1771254, 2657478, 3544369, 4432068,
    5320654, 6210140, 7100465, 7991506,
    -1, -1
  ];

  // Supports conversions to UTM
  private static GC_CHAR_POS = [
    0, 1, 2, 3, 4, 5, 6, 7, 255,
    8, 9, 10, 11, 12, 255, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23
  ];

  // Supports conversions to MGRS
  private static SP_OFF = 0;

  private static UTM_HEMI_NORTHERN = 'N';
  private static UTM_HEMI_SOUTHERN = 'S';

  /**
   * Converts a radian to degrees.
   *
   * @param rads Number in radians to convert.
   * @returns {number} Returns the value in degrees.
   */
  public static toDegrees(rads: number): number {
    return rads * (180.0 / Math.PI);
  }

  /**
   * Converts a number in degrees to radians.
   *
   * @param degrees Number in rads to convert.
   * @returns {number} Returns the value in rads.
   */
  public static toRads(degrees: number): number {
    return degrees * (Math.PI / 180.0);
  }

  /**
   * Converts any coordinate into UTM.
   *
   * @method toUTM
   * @memberOf CoordConverter
   * @param toConvert The coordinate to convert.
   * @returns {Utm} Returns the converted coordinate in a Utm object.
   */
  public static toUTM(latLo: Geodetic): Utm {
    let retval= new Utm();

    if (latLo) {
 
      const deg2rad = Math.PI / 180.0;
      const equatorial_radius = 6378137.0;
      const recepicalFlattning = 298.257223563;
      const b = equatorial_radius * (1 - (1.0 / recepicalFlattning));
      const secondEcc = ((recepicalFlattning * recepicalFlattning) / (b * b)) - 1;
      const eccentricity_squared = 1 - ((b * b) / (equatorial_radius * equatorial_radius));
      const eccentricity_prime_squared = secondEcc;
      
      const LatDegree = latLo.latitude
      const LongDegree = latLo.longitude;
      let UTMEastingMeter = 0;
      let UTMNorthingMeter = 0;
      const k0 = 0.9996;
    
      // Make sure the longitude is between -180.00 .. 179.9
      const LongTemp = (LongDegree+180) - ((LongDegree+180)/360)*360-180; // -180.00 .. 179.9;
      const LatRad = LatDegree*deg2rad;
      const LongRad = LongTemp*deg2rad;
        
      let ZoneNumber = ((LongTemp + 180)/6) + 1;
        
      if( LatDegree >= 56.0 && LatDegree < 64.0 && LongTemp >= 3.0 && LongTemp < 12.0 )
        ZoneNumber = 32;
        
        // Special zones for Svalbard
      if( LatDegree >= 72.0 && LatDegree < 84.0 ) 
      {
            if(      LongTemp >= 0.0  && LongTemp <  9.0 ) ZoneNumber = 31;
            else if( LongTemp >= 9.0  && LongTemp < 21.0 ) ZoneNumber = 33;
            else if( LongTemp >= 21.0 && LongTemp < 33.0 ) ZoneNumber = 35;
            else if( LongTemp >= 33.0 && LongTemp < 42.0 ) ZoneNumber = 37;
      }
        
      const LongOriginRad = ((ZoneNumber - 1)*6 - 180 + 3) * deg2rad;  // + 3 puts origin in middle of zone
        
      const UTMZone = CoordinateConverter.UTMLetterDesignator(LatDegree);
      
      // compute the UTM Zone from the latitude and longitude
      // sprintf(UTMZone, "%d%c", ZoneNumber, UTMLetterDesignator(LatDegree));
        
      const N = equatorial_radius/Math.sqrt(1-eccentricity_squared*Math.sin(LatRad)*Math.sin(LatRad));
      const T = Math.tan(LatRad)*Math.tan(LatRad);
      const C = eccentricity_prime_squared*Math.cos(LatRad)*Math.cos(LatRad);
      const A = Math.cos(LatRad)*(LongRad-LongOriginRad);
        
      const M = equatorial_radius*((1	- eccentricity_squared/4 - 3*eccentricity_squared*eccentricity_squared/64	- 5*eccentricity_squared*eccentricity_squared*eccentricity_squared/256)*LatRad 
                                      - (3*eccentricity_squared/8	+ 3*eccentricity_squared*eccentricity_squared/32	+ 45*eccentricity_squared*eccentricity_squared*eccentricity_squared/1024)*Math.sin(2*LatRad)
                                      + (15*eccentricity_squared*eccentricity_squared/256 + 45*eccentricity_squared*eccentricity_squared*eccentricity_squared/1024)*Math.sin(4*LatRad) 
                                      - (35*eccentricity_squared*eccentricity_squared*eccentricity_squared/3072)*Math.sin(6*LatRad));
      
      UTMEastingMeter = (k0*N*(A+(1-T+C)*A*A*A/6
                                        + (5-18*T+T*T+72*C-58*eccentricity_prime_squared)*A*A*A*A*A/120)
                                  + 500000.0);
        
      UTMNorthingMeter = (k0*(M+N*Math.tan(LatRad)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24
                                                        + (61-58*T+T*T+600*C-330*eccentricity_prime_squared)*A*A*A*A*A*A/720)));
        
      if(LatDegree < 0)
      {
        UTMNorthingMeter += 10000000.0; //10000000 meter offset for southern hemisphere
      }
      
      
      // Southern hemisphere?
      let hemi = CoordinateConverter.UTM_HEMI_NORTHERN;
      if(LatDegree < 0) {
          hemi = CoordinateConverter.UTM_HEMI_SOUTHERN;
      }
      
      const easting = Math.round(UTMEastingMeter);
      const northing = Math.round(UTMNorthingMeter);
  
      retval.easting = easting;
      retval.elevation = 0;
      retval.hemisphere = hemi;
      retval.northing = northing;
      retval.zone = ZoneNumber;
      retval.zoneDesignator = UTMZone;
    }

    return retval;
  }

  /**
   * 
   * @param LatDegree 
   * @returns 
   */
  private static UTMLetterDesignator(LatDegree: number) {
    let LetterDesignator = '';


    if((84 >= LatDegree) && (LatDegree >= 72)) LetterDesignator = "X";
    else if((72 > LatDegree) && (LatDegree >= 64)) LetterDesignator = "W";
    else if((64 > LatDegree) && (LatDegree >= 56)) LetterDesignator = "V";
    else if((56 > LatDegree) && (LatDegree >= 48)) LetterDesignator = "U";
    else if((48 > LatDegree) && (LatDegree >= 40)) LetterDesignator = "T";
    else if((40 > LatDegree) && (LatDegree >= 32)) LetterDesignator = "S";
    else if((32 > LatDegree) && (LatDegree >= 24)) LetterDesignator = "R";
    else if((24 > LatDegree) && (LatDegree >= 16)) LetterDesignator = "Q";
    else if((16 > LatDegree) && (LatDegree >= 8)) LetterDesignator = "P";
    else if(( 8 > LatDegree) && (LatDegree >= 0)) LetterDesignator = "N";
    else if(( 0 > LatDegree) && (LatDegree >= -8)) LetterDesignator = "M";
    else if((-8> LatDegree) && (LatDegree >= -16)) LetterDesignator = "L";
    else if((-16 > LatDegree) && (LatDegree >= -24)) LetterDesignator = "K";
    else if((-24 > LatDegree) && (LatDegree >= -32)) LetterDesignator = "J";
    else if((-32 > LatDegree) && (LatDegree >= -40)) LetterDesignator = "H";
    else if((-40 > LatDegree) && (LatDegree >= -48)) LetterDesignator = "G";
    else if((-48 > LatDegree) && (LatDegree >= -56)) LetterDesignator = "F";
    else if((-56 > LatDegree) && (LatDegree >= -64)) LetterDesignator = "E";
    else if((-64 > LatDegree) && (LatDegree >= -72)) LetterDesignator = "D";
    else if((-72 > LatDegree) && (LatDegree >= -80)) LetterDesignator = "C";
    else LetterDesignator = "Z"; //This is here as an error flag to show that the Latitude is outside the UTM limits
      
    return LetterDesignator;
  
  }


  /**
   * Determines the distance in meters and bearing in degrees from one location to another.
   * CoordinateConverter is the Vincenty algorithm and was borrowed from:
   *
   * http://www.movable-type.co.uk/scripts/latlong-vincenty.html
   *
   * which is based on:
   *  T Vincenty, "Direct and Inverse Solutions of Geodesics on the Ellipsoid with application
   *       of nested equations", Survey Review, vol XXIII no 176, 1975
   *       http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf
   *
   * @method distanceTo
   * @memberOf CoordConverter
   * @param p1 The initial point in coord.Geodetic
   * @param p2 The final point in coord.Geodetic
   * @returns {coord.DistanceBearing} Returns the distance and bearing from the first point to the second.
   * @throws {Error} Thrown if the formula failed to converge.
   */
  public static distanceTo(p1: Geodetic, p2: Geodetic): DistanceBearing {

    const retval = new DistanceBearing();

    const φ1 = CoordinateConverter.toRads(p1.latitude);
    const λ1 = CoordinateConverter.toRads(p1.longitude);
    const φ2 = CoordinateConverter.toRads(p2.latitude);
    const λ2 = CoordinateConverter.toRads(p2.longitude);

    const a = CoordinateConverter.wgs84SemiMajorAxis;
    const b = CoordinateConverter.mgs84SemiMinorAxis;
    const f = (a - b) / a; // Flattening

    const L = λ2 - λ1;
    const tanU1 = (1 - f) * Math.tan(φ1);
    const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1));
    const sinU1 = tanU1 * cosU1;
    const tanU2 = (1 - f) * Math.tan(φ2);
    const cosU2 = 1 / Math.sqrt((1 + tanU2 * tanU2));
    const sinU2 = tanU2 * cosU2;

    let sinλ = 0;
    let cosλ = 0;
    let sinSqσ = 0;
    let sinσ = 0;
    let cosσ = 0;
    let σ = 0;
    let sinα = 0;
    let cosSqα = 0;
    let cos2σM = 0;
    let C = 0;
    let λ = L;
    let λʹ  = 0;
    let iterations = 0;

    do {
      sinλ = Math.sin(λ);
      cosλ = Math.cos(λ);
      sinSqσ = (cosU2 * sinλ) * (cosU2 * sinλ) + (cosU1 * sinU2 - sinU1 * cosU2 * cosλ) * (cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
      sinσ = Math.sqrt(sinSqσ);

      // co-incident points
      if (sinσ === 0) {
        retval.distance = retval.initialBearing = retval.finalBearing = 0;
        return retval;
      }
      cosσ = sinU1 * sinU2 + cosU1 * cosU2 * cosλ;
      σ = Math.atan2(sinσ, cosσ);
      sinα = cosU1 * cosU2 * sinλ / sinσ;
      cosSqα = 1 - sinα * sinα;
      cos2σM = cosσ - 2 * sinU1 * sinU2 / cosSqα;

      // equatorial line: cosSqα=0 (§6)
      if (isNaN(cos2σM)) {
        cos2σM = 0;
      }

      C = f / 16 * cosSqα * (4 + f * (4 - 3 * cosSqα));
      λʹ = λ;
      λ = L + (1 - C) * f * sinα * (σ + C * sinσ * (cos2σM + C * cosσ * (-1 + 2 * cos2σM * cos2σM)));
    } while (Math.abs(λ - λʹ) > 1e-12 && ++iterations < 200);

    if (iterations >= 200) {
      throw new Error('Formula failed to converge');
    }

    const uSq = cosSqα * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const Δσ = B * sinσ * (cos2σM + B / 4 * (cosσ * (-1 + 2 * cos2σM * cos2σM) -
      B / 6 * cos2σM * (-3 + 4 * sinσ * sinσ) * (-3 + 4 * cos2σM * cos2σM)));

      const s = b * A * (σ - Δσ);

    let α1 = Math.atan2(cosU2 * sinλ, cosU1 * sinU2 - sinU1 * cosU2 * cosλ);
    let α2 = Math.atan2(cosU1 * sinλ, -sinU1 * cosU2 + cosU1 * sinU2 * cosλ);

    α1 = (α1 + 2 * Math.PI) % (2 * Math.PI); // normalize to 0...360
    α2 = (α2 + 2 * Math.PI) % (2 * Math.PI); // normalize to 0...360

    retval.distance = s;
    retval.initialBearing = CoordinateConverter.toDegrees(α1);
    retval.finalBearing = CoordinateConverter.toDegrees(α2);

    return retval;
  }
}
