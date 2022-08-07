/**
 * CPM-39529 has been created to clean up this file.
 * 
 * Shapefile for World Wind.  Only the APIs we need for the MapCanvas Web World
 * Wind implementation are shaped here. For function and attribute descriptions 
 * that are not here see: https://nasaworldwind.github.io/WebWorldWind/
 * 
 * Note when adding to this file:
 * When adding a class try to add the whole class and not just the functions that are
 * immediately needed. It is less work to add it as a whole then to try to check if 
 * everything is included, then add what you need that isn't.
 * Also please add the comments from Nasa to coding standards. If Nasa's document link
 * changes or is no longer available in the future, developers need to know what sections
 * of this file do.
 * 
 * Note when looking for something:
 * In generaly Nasa uses Object when they want to keep the type generic as possible.
 * Most uses of any in this file are actually typed in the web world wind docs, but 
 * were not typed here to avoid having to shape the whole API.
 */

declare module WorldWind {

  // tslint:disable-next-line
  let ABSOLUTE: any;

  // tslint:disable-next-line
  let RELATIVE_TO_GROUND: any;

  // tslint:disable-next-line
  let CLAMP_TO_GROUND: any;

  // tslint:disable-next-line
  let OFFSET_FRACTION: any

  // tslint:disable-next-line
  let OFFSET_PIXELS: any;

  // tslint:disable-next-line
  let OFFSET_INSET_PIXELS: any;

  // tslint:disable-next-line
  let BEFORE_REDRAW: any;

  // tslint:disable-next-line
  let AFTER_REDRAW: any;

  // tslint:disable-next-line
  let configuration: any;

  // tslint:disable-next-line
  let navigator: LookAtNavigator;

  let REDRAW_EVENT_TYPE: any;

  let RHUMB_LINE: any;

  let RELATIVE_TO_GLOBE: any;

  let LINEAR: any;

  let GREAT_CIRCLE: any;

  export class LayerManager {
    constructor(arg: any);
  }

  export class BMNGLayer extends Layer {

  }

  export class BMNGLandsatLayer extends Layer {

  }

  export class BingTiledImageLayer extends Layer {

  }

  export class BingAerialLayer extends Layer {
    constructor(arg: any);
  }

  export class BingAerialWithLabelsLayer extends Layer {
    constructor(arg: any);
  }

  export class BingRoadsLayer extends Layer {
    constructor(arg: any);
  }

  export class OpenStreetMapImageLayer extends Layer {
    constructor(arg: any);
  }

  export class AtmosphereLayer extends Layer {

  }

  export class CoordinatesDisplayLayer extends Layer {
    constructor(wwd: WorldWindow);
  }

  export class Color {
    public static BLACK: Color;
    public static BLUE: Color;
    public static CYAN: Color;
    public static DARK_GRAY: Color;
    public static GREEN: Color;
    public static LIGHT_GRAY: Color;
    public static MAGENTA: Color;
    public static MEDIUM_GRAY: Color;
    public static RED: Color;
    public static TRANSPARENT: Color;
    public static WHITE: Color;
    public static YELLOW: Color;

    public static colorFromHex(color: any): any;
    constructor(red: number, green: number, blue: number, alpha: number);
  }


  export class Vec2 {
    constructor(x: number, y: number);
  }

  export class Font {
    public size: number;
    public style: string;
    public variant: string;
    public weight: string;
    public family: string;
    public horizontalAlignment: string;
    public fontString: string;

    constructor(size: number, style: string, variant: string, weight: string, family: string, horizontalAlignment: string);
  }

  export class Offset {
    public xUnits: string;
    public x: number;
    public yUnits: string;
    public y: number;

    constructor(xUnits: string, x: number, yUnits: string, y: number);
  }

  export class Position {
    public latitude: number;
    public longitude: number;
    public altitude: number;

    public static interpolateLinear(amount: number, position1: Position, position2: Position, result: Position): Position;

    constructor(latitude?: number, longitude?: number, altitude?: number);
  }

  export class SurfacePolyline extends SurfaceShape {

    // This polyline's locations
    public boundaries: Array<Location>;

    // The attributes to apply to this shape.
    public attributes: ShapeAttributes;

    public altitudeMode: any;

    public pathType: string;

    /**
     * Represents a Polyline draped over the terrain surface.
     * @param {Array.<Location>} locations - This polyline's locations
     * @param {ShapeAttributes} attributes - The attributes to apply to this shape. May be null, in which case 
     * attributes must be set directly before the shape is drawn.
     */
    constructor(locations: any, attributes: ShapeAttributes);

    /**
     * Called during rendering. Overridden from AbstractShape base class that creates and enques an
     * ordered renderable for this shape if this shape is to be displayed. Applications do not call this method.
     * @param {DrawContext} dc The current draw context.
     */
    public doMakeOrderedRenderable(dc: any): any;

    /**
     * Render this renderable. Some shapes actually draw themselves during this call, others only add themselves
     * to the draw context's ordered rendering list for subsequent drawing when their renderOrdered method is called.
     * This method is intended to be called by layers such as RenderableLayer and not by applications.
     * @param {DrawContext} dc The current draw context.
     */
    public render(dc: any): void;
  }

  /**
   * Represents a circle draped over the terrain surface.
   * @param Location center - The circle's center location
   * @param Number radius - The circle's radius in meters
   * @param ShapeAttributes attributes - The attributes to apply to this shape. May be null, in which case attributes must be set directly before the shape is drawn.
   */
  export class SurfaceCircle {
    public center: Location;
    public radius: number;
    public attributes: ShapeAttributes;

    constructor(center: Location, radius: number, attributes: ShapeAttributes);
  }
  export class Location {
    public latitude: number;
    public longitude: number;

    public static interpolateAlongPath(pathType: string, amount: number, location1: Location, location2: Location, result: Location): Location;
    public static greatCircleLocation(location: any, greatCircleAzimuthDegrees: number, pathLengthRadians: number, result: Location): Location;
    public static greatCircleDistance(location1: any, location2: any): number;

    constructor(latitude: number, longitude: number);
  }

  export class AbstractShape {
    //undocumented and/or marked private in js
    protected currentData: any;
    protected establishCurrentData(dc: any): void;
  }

  export class Path extends AbstractShape {
    public altitudeMode: string;
    public attributes: ShapeAttributes;
    public displayName: string;
    public enabled: boolean;
    public expirationInterval: number;
    public extrude: boolean;
    public followTerrain: boolean;
    public highlightAttributes: ShapeAttributes;
    public highlighted: boolean;
    public numSubSegments: number;
    public pathType: string;
    public pickDelegate: Object;
    public positions: Array<Position>;
    public terrainConformance: number;
    public userProperties: Object;
    public useSurfaceShapeFor2D: boolean;

    //undocumented and/or marked private in js
    protected eyeDistance: number;
    protected _altitudeMode: string;
    protected _positions: any;
    protected _followTerrain: any;

    constructor(positions: any, attributes: ShapeAttributes);
    public doMakeOrderedRenderable(dc: any): any;
    public render(dc: any): void;

    //undocumented and/or marked private in js
    protected makeTessellatedPositions(dc: any): any;
    protected computeRenderedPath(dc: any, tessellatedPositions: any): any;
    protected makeSegment(dc: any, posA: any, posB: any, ptA: any, ptB: any, tessellatedPositions: any): void;
    protected mustDrawVerticals(dc: any): any;
    protected mustDrawInterior(dc: any): any;
    protected mustDrawVerticals(dc: any): any;
  }

  export class ShapeAttributes {
    public applyLighting: boolean;
    public depthTest: boolean;
    public drawInterior: boolean;
    public drawOutline: boolean;
    public drawVerticals: boolean;
    public enableLighting: boolean;
    public imageSource: boolean;
    public interiorColor: Color;
    public outlineColor: Color;
    public outlineStippleFactor: number;
    public outlineStipplePattern: number;
    public outlineWidth: number;

    constructor(attributes?: ShapeAttributes);
  }

  export class Placemark extends Renderable {
    public eyeDistance: number;
    public alwaysOnTop: boolean;
    public displayName: string;
    public altitudeMode: any;
    public attributes: PlacemarkAttributes;
    public pickDelegate: any;
    public position: Position;
    public enabled: boolean;
    public imageRotation: number;
    public imageRotationReference: string;
    public updatePosition: boolean;

    constructor(position: any, eyeDistanceScaling: boolean, attributes: PlacemarkAttributes);
    public render(dc: any): void;
    public beginDrawing(dc: any): void;
    public endDrawing(dc: any): void;
    public doDrawOrderedPlacemark(dc: any): void;
    public drawBatchOrderedPlacemarks(dc: any): void;
    public drawOrderedPlacemark(dc: any): void;
    public makeOrderedRenderable(dc: any): any;
  }

  export class PlacemarkAttributes {
    public imageSource: string | ImageSource;
    public imageScale: number;
    public imageColor: Color;
    public altitudeMode: any;
    public imageOffset: Offset;

    constructor(attributes?: PlacemarkAttributes);
  }

  export class Layer {
    public displayName: string;
    public enabled: boolean;
    public pickEnabled: boolean;
    public opacity: number;
    public minActiveAltitude: number;
    public maxActiveAltitude: number;
    public inCurrentFrame: boolean;
    public time: Date;
    public layerIdentifier: string;
    public renderPosition: number;

    public refresh(): void;
    public render(dc: any): void;
    public doRender(dc: any): void;
    public withinActiveAltitudes(dc: any): boolean;
    public isLayerInView(dc: any): boolean;

    constructor(displayName?: string);
  }

  export class ScreenImage {
    constructor(imageOffset: Offset, imagePath: string);
  }

  /**
   * Represents a string of text displayed at a specified geographic or screen position. 
   * This is an abstract class meant to be subclassed and not meant to be instantiated directly.
   * See GeographicText and ScreenText for concrete classes.
   */
  export class Text extends Renderable {
    /**
     * Constructs a text shape. This constructor is intended to be called only by subclasses.
     * @param text The text to display.
     */
    constructor(text: string);

    /**
     * This text's altitude mode. May be one of
     *   WorldWind.ABSOLUTE
     *   WorldWind.RELATIVE_TO_GROUND
     *   WorldWind.CLAMP_TO_GROUND
     */
    public altitudeMode: any;

    // Indicates whether this text has visual priority over other shapes in the scene.
    public alwaysOnTop: boolean;

    // The text's attributes. If null and this text is not highlighted, this text is not drawn.
    public attributes: TextAttributes;

    /** 
     * This shape's current visibility, a value between 0 and 1. 
     * This property scales the shape's effective opacity. It is incremented 
     * or decremented each frame according to the draw context's fade velocity 
     * property in order to achieve this shape's current target visibility. 
     * This current visibility and target visibility are used to control the 
     * fading in and out of this shape. 
     */
    public readonly currentVisibility: Number;

    /**
     * Indicates the group ID of the declutter group to include this Text shape. 
     * If non-zer0, this shape is decluttered relative to all other shapes within 
     * its group.
     */
    public declutterGroup: Number;

    // The display name of the renderable.
    public displayName: string;

    // Indicates whether this text is drawn.
    public enabled: boolean;

    /** The attributes used when this text's highlighted flag is true. 
     * If null and the highlighted flag is true, this text's normal 
     * attributes are used. If they, too, are null, this text is not drawn. 
     */
    public highlightAttributes: TextAttributes;

    // Indicates whether this text uses its highlight attributes rather than its normal attributes.
    public highlighted: boolean;

    // The scale to apply to the markerImageSource.
    public markerImageScale: Number;

    // The image to display when this text shape is eliminated from the scene due to decluttering.
    public markerImageSource: string;

    /**
     * Indicates the object to return as the userObject of this text when picked. 
     * If null, then this text object is returned as the userObject.
     */
    public pickDelegate: Object;

    // Indicates the screen coordinate bounds of this shape during ordered rendering.
    public readonly screenBounds: Rectangle;

    /**
     * This shape's target visibility, a value between 0 and 1. 
     * During ordered rendering this shape modifies its current 
     * visibility towards its target visibility at the rate specified by 
     * the draw context's fadeVelocity property. The target visibility 
     * and current visibility are used to control the fading in and out 
     * of this shape.
     */
    public targetVisibility: Number;

    // This shape's text. If null or empty, no text is drawn.
    public text: string;

    /**
     *  An application defined object associated with this renderable.
     *  A typical use case is to associate application defined data with a picked renderable.
     */
    public userProperties: Object;

    // The following are not documented by Nasa world wind:
    // This was needed to override computeScreenPointAndEyeDistance(). We don't modify it, just pass it along the same was WWW does. 
    // Some sort of offset used to keep the text above the terrain.
    public depthOffset: number;
    // This was needed to override computeScreenPointAndEyeDistance(). We don't modify it, just pass it along the same was WWW does. 
    // Likely the screen coordinates to render at.
    public screenPoint: number;
    // End undocumented by Nasa

    /**
     * Computes this shape's screen point and eye distance. Subclasses must override this method.
     * @param dc The current draw context.
     */
    protected computeScreenPointAndEyeDistance(dc: any): boolean;

    /**
     * Copies the contents of a specified text object to this text object.
     * @param that The text object to copy.
     */
    public copy(that: Text): void;

    /**
     * Renders this text. This method is typically not called by applications 
     * but is called by RenderableLayer during rendering. For this shape this 
     * method creates and enques an ordered renderable with the draw context 
     * and does not actually draw the text.
     * @param dc The current draw context.
     */
    public render(dc: any): void;

    /**
     * Draws this shape as an ordered renderable. Applications do not call 
     * this function. It is called by WorldWindow during rendering. 
     * Implements the OrderedRenderable interface.
     * @param dc The current draw context.
     */
    public renderOrdered(dc: any): void;
  }

  export class ScreenText extends WorldWind.Text {
    public screenOffset: Offset;
    public attributes: TextAttributes;
    public text: string;

    public render(dc: any): void;

    constructor(screenOffset: Offset, text: string);
  }

  /**
   * Represents a string of text displayed at a geographic position.
   * See also ScreenText.
   */
  export class GeographicText extends WorldWind.Text {
    /**
     * Constructs a geographic text shape at a specified position.
     * @param position The text's geographic position.
     * @param text The text to display.
     */
    constructor(position: Position, text: string);

    /**
     * This text's altitude mode. May be one of
     *   WorldWind.ABSOLUTE
     *   WorldWind.RELATIVE_TO_GROUND
     *   WorldWind.CLAMP_TO_GROUND
     */
    public altitudeMode: any;

    // Indicates whether this text has visual priority over other shapes in the scene.
    public alwaysOnTop: boolean;

    // The text's attributes. If null and this text is not highlighted, this text is not drawn.
    public attributes: TextAttributes;

    /**
     * This shape's current visibility, a value between 0 and 1. 
     * This property scales the shape's effective opacity. 
     * It is incremented or decremented each frame according to the draw context's 
     * fade velocity property in order to achieve this shape's current target visibility. 
     * This current visibility and target visibility are used to control the fading in and 
     * out of this shape.
     */
    public readonly currentVisibility: number;

    /**Indicates the group ID of the declutter group to include this Text shape. 
     * This shape is decluttered relative to all other shapes within its group by the 
     * default declutter filter. To prevent decluttering of this shape, set its declutter 
     * group to 0. 
     */
    public declutterGroup: number;

    // The display name of the renderable.
    public displayName: string;

    // Indicates whether this text is drawn.
    public enabled: boolean;

    /**
     * The attributes used when this text's highlighted flag is true. 
     * If null and the highlighted flag is true, this text's normal attributes are used. 
     * If they, too, are null, this text is not drawn.
     */
    public highlightAttributes: TextAttributes;

    // Indicates whether this text uses its highlight attributes rather than its normal attributes.
    public highlighted: boolean;

    // The scale to apply to the markerImageSource.
    public markerImageScale: number;

    // The image to display when this text shape is eliminated from the scene due to decluttering.
    public markerImageSource: string;

    // Indicates the object to return as the userObject of this text when picked. If null, then this text object is returned as the userObject.
    public pickDelegate: Object;

    // This text's geographic position. The TextAttributes.offset property indicates the relationship of the text string to this position.
    public position: Position;

    // Indicates the screen coordinate bounds of this shape during ordered rendering.
    public readonly screenBounds: Rectangle;

    /**
     * This shape's target visibility, a value between 0 and 1. 
     * During ordered rendering this shape modifies its current visibility towards 
     * its target visibility at the rate specified by the draw context's fadeVelocity property. 
     * The target visibility and current visibility are used to control the fading in and out of this shape.
     */
    public targetVisibility: number;

    // This shape's text. If null or empty, no text is drawn.
    public text: string;

    // An application defined object associated with this renderable. A typical use case is to associate application defined data with a picked renderable.
    public userProperties: Object;

    // The following are not documented by Nasa world wind:
    // This was needed to override computeScreenPointAndEyeDistance(). We don't modify it, just pass it along the same was WWW does. Don't know what it is.
    protected static placePoint: Vec3;
    // This is a number represented the calculated distance from this object to the camera that renders the map. We modify this to influence render ordering.
    public eyeDistance: number;
    // End undocumented by Nasa

    /**
     * Creates a new geographic text object that is a copy of this one.
     */
    public clone(): GeographicText;
    /**
     * Computes this shape's screen point and eye distance. Subclasses must override this method.
     * @param dc The current draw context.
     */
    protected computeScreenPointAndEyeDistance(dc: any): boolean;

    /**
     * Copies the contents of a specified text object to this text object.
     * @param that The text object to copy.
     */
    public copy(that: WorldWind.Text): void;

    /**
     * Renders this text. This method is typically not called by applications but is called 
     * by RenderableLayer during rendering. For this shape this method creates and enques an 
     * ordered renderable with the draw context and does not actually draw the text.
     * @param dc The current draw context.
     */
    public render(dc: any): void;

    /**
     * Draws this shape as an ordered renderable. 
     * Applications do not call this function. 
     * It is called by WorldWindow during rendering. 
     * Implements the OrderedRenderable interface.
     * @param dc The current draw context.
     */
    public renderOrdered(dc: any): void;

  }

  export class TextAttributes {
    public color: Color;
    public offset: Offset;
    public font: Font;
    public enableOutline: boolean;
    public markerImageSource: string;
    public outlineColor: Color;
    public outlineWidth: Number;
    public depthTest: boolean;

    public render(dc: any): void;

    constructor(attributes: TextAttributes);
  }

  export class WorldWindow {
    public redrawRequested: boolean;
    public redrawCallbacks: Array<any>;
    public navigator: any;
    public frameStatistics: any;
    public canvasCoordinates: any;
    public globe: any;
    public goToAnimator: any;
    public drawContext: DrawContext;
    public readonly layers: Array<RenderableLayer>;
    public readonly canvas: any;
    public readonly viewport: Rectangle;
    public resetDrawContext(): void;
    public addLayer(layer: Layer): void;
    public removeLayer(layer: Layer): void;
    public insertLayer(index: number, layer: any): void;
    public addEventListener(type: any, listener: any): void;
    public removeEventListener(type: any, listener: any): void;
    public pick(pickPoint: any): any;
    public pickTerrain(pickPoint: any): any;
    public redraw(): void;
    public enablePlacemarkBatchRender(textureAtlasInitialSize: number, textureAtlasMaxSize: number, maxPlacemarks: number): void;
    public disablePlacemarkBatchRender(): void;
    public redrawIfNeeded(): void;
    public createContext(canvas: any): any;
    public drawFrame(): void;
    public doDraw(): void;
    public animationFrameLoop(): void;


    constructor(canvasName: string, elevationModel?: any);
  }

  export class LookAtNavigator {
    public range: number;
    public roll: number;
    public tilt: number;
    public lookAtLocation: Location;
    public heading: number;
    public primaryDragRecognizer: any;

    public beginHeading: number;
    public beginPoint: Vec2;
    public beginRange: number;
    public beginTilt: number;
    public enable2DLimits: boolean;
    public farDistance: number;
    public lastPoint: Vec2;
    public lastRotation: number;
    public nearDistance: number;
    public panRecognizer: any;
    public pinchRecognizer: any;
    public rotationRecognizer: any;
    public secondaryDragRecognizer: any;
    public tiltRecognizer: any;
    public worldWindow: WorldWindow;

    public handlePanOrDrag(recognizer: any): void;
    public handleWheelEvent(recognizer: any): void;
    public handleSecondaryDrag(recognizer: any): void;
    public handlePinch(recognizer: any): void;
    public handleRotation(recognizer: any): void;
    public handleTilt(recognizer: any): void;

    constructor(wwd: WorldWind.WorldWindow);
  }

  export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number);
  }

  export class DragRecognizer {
    public enabled: boolean;

    constructor(target: any, callback: Function)
  }

  export class PanRecognizer {
    public enabled: boolean;

    constructor(target: any, callback: Function);
  }

  export class PinchRecognizer {
    public enabled: boolean;

    constructor(target: any, callback: Function);
  }

  export class RotationRecognizer {
    public enabled: boolean;

    constructor(target: any, callback: Function);
  }

  export class TiltRecognizer {
    public enabled: boolean;

    constructor(target: any, callback: Function);
  }

  /**
   * Provides a layer that contains shapes and other renderables.
   */
  export class RenderableLayer extends Layer {
    /**
     * Constructs a layer that contains shapes and other renderables.
     * @param displayName This layer's display name.
     */
    constructor(displayName: string);

    // This layer's display name.
    public displayName: string;

    // Indicates whether to display this layer.
    public enabled: boolean;

    // Indicates whether elements of this layer were drawn in the most recently generated frame.
    public readonly inCurrentFrame: boolean;

    // The eye altitude below which this layer is displayed, in meters.
    public maxActiveAltitude: number;

    // The eye altitude above which this layer is displayed, in meters.
    public minActiveAltitude: number;

    // This layer's opacity, which is combined with the opacity of shapes within layers. Opacity is in the range [0, 1], with 1 indicating fully opaque.
    public opacity: number;

    // Indicates whether this layer is pickable.
    public pickEnabled: boolean;

    // The array of renderables
    public readonly renderables: Array<Renderable>;

    // The time to display. This property selects the layer contents that represents the specified time. If null, layer-type dependent contents are displayed.
    public time: Date;

    public placement: any;

    public compass: any;

    public showHeadingControl: boolean;
    public showTiltControl: boolean;
    public showExaggerationControl: boolean;
  
    /**
     * Adds a renderable to this layer.
     * @param renderable The renderable to add.
     */
    public addRenderable(renderable: Renderable): void;

    /**
     * Adds an array of renderables to this layer.
     * @param renderables The renderables to add.
     */
    public addRenderables(renderables: Array<Renderable>): void;

    /**
     * Subclass method called to display this layer. 
     * Subclasses should implement this method rather than the render method, 
     * which determines enable, pick and active altitude status and does not 
     * call this doRender method if the layer should not be displayed.
     * @param dc The current draw context.
     */
    public doRender(dc: any): void;

    /**
     * Indicates whether this layer is within the current view. 
     * Subclasses may override this method and when called determine 
     * whether the layer contents are visible in the current view frustum. 
     * The default implementation always returns true.
     * @param dc The current draw context.
     */
    public isLayerInView(dc: any): boolean;

    /**
     * Refreshes the data associated with this layer. 
     * The behavior of this function varies with the layer type. 
     * For image layers, it causes the images to be re-retrieved from their origin.
     */
    public refresh(): void;

    // Removes all renderables from this layer. Does not call dispose on those renderables.
    public removeAllRenderables(): void;

    // Removes a renderable from this layer.
    public removeRenderable(renderable: Renderable): void;

    /**
     * Displays this layer. Subclasses should generally not override this method 
     * but should instead override the doRender method. This method calls that 
     * method after verifying that the layer is enabled, the eye point is within 
     * this layer's active altitudes and the layer is in view.
     * @param dc The current draw context.
     */
    public render(dc: any): void;
  }

  /**
   * Represents a three-component vector. 
   * Access the X component of the vector as v[0], the Y component as v[1] and the Z component as v[2].
   */
  export class Vec3 {

    /**
     * Constructs a three-component vector.
     * 
     * @param {Number} x X component of vector
     * @param {Number} y Y component of vector
     * @param {Number} z Z component of vector
     */
    constructor(x: number, y: number, z: number);

    // A vector corresponding to the origin.
    public static ZERO: Vec3;

    /**
     * Adds a specified vector to this vector.
     * @param addend The vector to add.
     */
    public add(addend: Vec3): Vec3;

    /**
     * Copies the components of a specified vector to this vector.
     * @param vector The vector to copy.
     */
    public copy(vector: Vec3): Vec3;

    /**
     * Computes the cross product of this vector and a specified vector, modifying this vector.
     * @param vector The vector to cross with this vector.
     */
    public cross(vector: Vec3): Vec3;

    /**
     * Computes the distance from this vector to another vector.
     * @param vector The vector to compute the distance to.
     */
    public distanceTo(vector: Vec3): number;

    /**
     * Computes the squared distance from this vector to a specified vector.
     * @param vector The vector to compute the distance to.
     */
    public distanceToSquared(vector: Vec3): number;

    /**
     * Divides this vector by a scalar.
     * @param divisor The scalar to divide this vector by.
     */
    public divide(divisor: number): Vec3;

    /**
     * Computes the scalar dot product of this vector and a specified vector.
     * @param vector The vector to multiply.
     */
    public dot(vector: Vec3): number;

    /**
     * Indicates whether the components of this vector are identical to those of a specified vector.
     * @param vector The vector to test.
     */
    public equals(vector: Vec3): boolean;

    /**
     * Computes the magnitude of this vector.
     */
    public magnitude(): number;

    /**
     * Computes the squared magnitude of this vector.
     */
    public magnitudeSquared(): number;

    /**
     * Mixes (interpolates) a specified vector with this vector, modifying this vector.
     * @param vector The vector to mix with this one.
     * @param weight The relative weight of this vector.
     */
    public mix(vector: Vec3, weight: number): Vec3;

    /**
     * Multiplies this vector by a scalar.
     * @param scalar The scalar to multiply this vector by.
     */
    public multiply(scalar: number): Vec3;

    // Commented out because depend on class not yet in the shapefile. Dependent on Matrix. Can be uncommented if class is added
    /**
     * Multiplies this vector by a 4x4 matrix. 
     * The multiplication is performed with an implicit W component of 1. 
     * The resultant W component of the product is then divided through the X, Y, and Z components.
     */
    // public multiplyByMatrix(matrix: Matrix): Vec3;

    /**
     * Negates the components of this vector.
     */
    public negate(): Vec3;

    /**
     * Normalizes this vector to a unit vector.
     */
    public normalize(): Vec3;

    /**
     * Assigns the components of this vector.
     * @param x The X component of the vector.
     * @param y The Y component of the vector.
     * @param z The Z component of the vector.
     */
    public set(x: number, y: number, z: number): Vec3;

    /**
     * Subtracts a specified vector from this vector.
     * @param subtrahend The vector to subtract
     */
    public subtract(subtrahend: Vec3): Vec3;

    /**
     * Swaps this vector with that vector. 
     * This vector's components are set to the values of the specified vector's components, 
     * and the specified vector's components are set to the values of this vector's components.
     * @param that The vector to swap.
     */
    public swap(that: Vec3): Vec3;

    /**
     * Returns a string representation of this vector.
     */
    public toString(): string;

    /**
     * Indicates whether three vectors are colinear.
     * @param a The first vector.
     * @param b The second vector.
     * @param c The third vector.
     */
    public static areColinear(a: Vec3, b: Vec3, c: Vec3): boolean;

    /**
     * Computes the average of a specified array of vectors.
     * @param vectors The vectors whose average to compute.
     * @param result A pre-allocated Vec3 in which to return the computed average.
     */
    public static average(vectors: Array<Vec3>, result: Vec3): Vec3;

    /**
     * Computes the average of a specified array of points packed into a single array.
     * @param points The points whose average to compute.
     * @param result A pre-allocated Vec3 in which to return the computed average.
     */
    public static averageOfBuffer(points: Float32Array | Float64Array | Array<number>, result: Vec3): Vec3;

    /**
     * Computes a unit-normal vector for a buffer of coordinate triples. The normal vector is computed from the first three non-colinear points in the buffer.
     * @param coords The coordinates, in the order x0, y0, z0, x1, y1, z1, ...
     * @param stride The number of numbers between successive points. 
     *               0 indicates that the points are arranged one immediately after the other, 
     *               as would the value 3.
     */
    public static computeBufferNormal(coords: Array<number>, stride: number): Vec3;

    /**
     * Computes the normal vector of a specified triangle.
     * @param a The triangle's first vertex.
     * @param b The triangle's second vertex.
     * @param c The triangle's third vertex.
     */
    public static computeTriangleNormal(a: Vec3, b: Vec3, c: Vec3): Vec3;

    /**
     * Finds three non-colinear points in an array of coordinates.
     * @param coords The coordinates, in the order x0, y0, z0, x1, y1, z1, ...
     * @param stride The number of numbers between successive points. 
     *               0 indicates that the points are arranged one immediately after the other, 
     *               as would the value 3.
     */
    public static findThreeIndependentVertices(coords: Array<number>, stride: number): Array<Vec3>;

    /**
     * Constructs a three-component vector.
     * @param x X component of vector.
     * @param y Y component of vector.
     * @param z Z component of vector.
     */
    constructor(x: number, y: number, z: number);
  }

  /**
   * Represents a shape or other object that can be rendered. 
   * This is an abstract class and is not meant to be instantiated directly.
   */
  export class Renderable {
    // The display name of the renderable.
    public displayName: string;

    // Indicates whether to display this renderable.
    public enabled: boolean;

    //Indicates the object to return as the userObject of this shape when picked. If null, then this shape is returned as the userObject.
    public pickDelegate: Object;

    // An application defined object associated with this renderable. A typical use case is to associate application defined data with a picked renderable.
    // public userProperties: Object;

    /**
     * Render this renderable. Some shapes actually draw themselves during this call, 
     * others only add themselves to the draw context's ordered rendering list for subsequent 
     * drawing when their renderOrdered method is called. This method is intended to be called 
     * by layers such as RenderableLayer and not by applications.
     * @param dc The current draw context.
     */
    public render(dc: any): void;
  }

  /**
   * Represents the state of a navigator.
   */
  export class NavigatorState {

    /**
     * Transforms the specified model point from model coordinates to WebGL screen coordinates.
     * 
     * @param {Vec3} modelPoint The model coordinate point to project.
     * @param {Vec3} result A pre-allocated vector in which to return the projected point.
     * @returns {boolean} Returns true or false to indicate whether or not the transformation was successful.
     */
    public project(modelPoint: Vec3, result: Vec3): boolean;


    /**
     * Transforms the specified screen point from WebGL screen coordinates to model coordinates.
     * <p>
     * The screen point is understood to be in WebGL screen coordinates, with the origin in the bottom-left corner
     * and axes that extend up and to the right from the origin.
     * <p>
     * This function stores the transformed point in the result argument, and returns true or false to indicate whether the
     * transformation is successful. It returns false if this navigator state's modelview or projection matrices
     * are malformed, or if the screenPoint is clipped by the near clipping plane or the far clipping plane.
     *
     * @param {Vec3} screenPoint The screen coordinate point to un-project.
     * @param {Vec3} result A pre-allocated vector in which to return the unprojected point.
     * @returns {boolean} true if the transformation is successful, otherwise false.
     * @throws {ArgumentError} If either the specified point or result argument is null or undefined.
     */
    public unProject(screenPoint: Vec3, result: Vec3): boolean;

    /**
     * Computes the approximate size of a pixel at a specified distance from the navigator's eye point.
     * <p>
     * This method assumes rectangular pixels, where pixel coordinates denote
     * infinitely thin spaces between pixels. The units of the returned size are in model coordinates per pixel
     * (usually meters per pixel). This returns 0 if the specified distance is zero. The returned size is undefined
     * if the distance is less than zero.
     *
     * @param {Number} distance The distance from the eye point at which to determine pixel size, in model
     * coordinates.
     * @returns {Number} The approximate pixel size at the specified distance from the eye point, in model
     * coordinates per pixel.
     */
    public pixelSizeAtDistance(distance: number): number;
  }

  /**
   * Provides current state during rendering. The current draw context is passed to most rendering methods in order to make those methods aware of current state.
   */
  export class DrawContext {
    /** The current WebGL rendering context. */
    public currentGlContext: WebGLRenderingContext;

    /** A 2D context for this draw context's canvas property. */
    public ctx2D: CanvasRenderingContext2D;

    /** A 2D canvas for creating texture maps. */
    public canvas2D: HTMLElement;

    /** The current WebGL framebuffer. Null indicates that the default WebGL framebuffer is active. */
    public currentFramebuffer: any;//FramebufferTexture;

    /** The current WebGL program. Null indicates that no WebGL program is active. */
    public currentProgram: any;

    /** The current state of the associated navigator. */
    public navigatorState: NavigatorState;

    /**
     * Creates an off-screen WebGL framebuffer for use during picking and stores it in this draw context.
     */
    public makePickFramebuffer(): void;

    public update(): void;
  }

  /**
   * Represents a WMS Capabilities document.
   */
  export class WmsCapabilities {
    /** An XML DOM representing the WMS Capabilities document. */
    public xmlDom: {};

    /**
     * Searches for a named layer matching the provided name and returns the WmsLayerCapabilities object representing the named layer.
     * 
     * @param {string} name The layer name to find.
     * @returns {WmsCapabilities} The WmsLayerCapaiblities object of the named layer provided.
     */
    public getNamedLayer(name: string): WmsCapabilities;

    /**
     * Constructs an WMS Capabilities instance from an XML DOM.
     * 
     * @param {{}} xmlDom An XML DOM representing the WMS Capabilities document.
     */
    constructor(xmlDom: {});
  }

  /**
   * Represents a WMS Capabilities document.
   */
  export class WmtsCapabilities {
    /** An XML DOM representing the WMTS Capabilities document. */
    public xmlDom: {};

    /**
     * Searches for a named layer matching the provided name and returns the WmsLayerCapabilities object representing the named layer.
     * 
     * @param {string} name The layer name to find.
     * @returns {WmsCapabilities} The WmsLayerCapaiblities object of the named layer provided.
     */
    public getLayer(name: string): WmtsCapabilities;

    /**
     * Constructs an WMS Capabilities instance from an XML DOM.
     * 
     * @param {{}} xmlDom An XML DOM representing the WMS Capabilities document.
     */
    constructor(xmlDom: {});
  }

  /**
   * Displays a WMS image layer.
   */
  export class WmsLayer extends Layer {
    /** 
     * Specifies configuration information for the layer. Must contain the following properties:
     *    - service: {String} The URL of the WMS server.
     *    - layerNames: {String} A comma separated list of the names of the WMS layers to include in this layer.
     *    - sector: {Sector} The sector spanned by this layer.
     *    - levelZeroDelta: {Location} The level-zero tile delta to use for this layer.
     *    - numLevels: {Number} The number of levels to make for this layer.
     *    - format: {String} The mime type of the image format to request, e.g., image/png.
     *    - size: {Number} The size in pixels of tiles for this layer.
     *    - coordinateSystem (optional): {String} The coordinate system to use for this layer, e.g., EPSG:4326.
     *    - styleNames (optional): {String} A comma separated list of the styles to include in this layer.
     */
    public config: {};

    /** The time parameter passed to the WMS server when imagery is requested. May be null, in which case no time parameter is passed to the server. */
    public timeString: string;

    public formLayerConfiguration: any;
    /**
     * Creates a WMS image layer.
     * 
     * @param {{}} config Specifies configuration information for the layer.
     * @param {string} [timeString] The time parameter passed to the WMS server when imagery is requested. May be null, in which case no time parameter is passed to the server.
     */
    constructor(config: {}, timeString?: string);
  }
  
  /**
   * Displays a WMTS image layer.
   */
  export class WmtsLayer extends Layer {
    /** 
     * Specifies configuration information for the layer. Must contain the following properties:
     *    - service: {String} The URL of the WMS server.
     *    - layerNames: {String} A comma separated list of the names of the WMS layers to include in this layer.
     *    - sector: {Sector} The sector spanned by this layer.
     *    - levelZeroDelta: {Location} The level-zero tile delta to use for this layer.
     *    - numLevels: {Number} The number of levels to make for this layer.
     *    - format: {String} The mime type of the image format to request, e.g., image/png.
     *    - size: {Number} The size in pixels of tiles for this layer.
     *    - coordinateSystem (optional): {String} The coordinate system to use for this layer, e.g., EPSG:4326.
     *    - styleNames (optional): {String} A comma separated list of the styles to include in this layer.
     */
    public config: {};

    /** The time parameter passed to the WMS server when imagery is requested. May be null, in which case no time parameter is passed to the server. */
    public timeString: string;


    public formLayerConfiguration: any;

    /**
     * Creates a WMS image layer.
     * 
     * @param {{}} config Specifies configuration information for the layer.
     * @param {string} [timeString] The time parameter passed to the WMS server when imagery is requested. May be null, in which case no time parameter is passed to the server.
     */
    constructor(config: {}, timeString?: string);
  }

  /* 
  * World Wind gesture recognizer.
  */
  export class Recognizer {
    /* Indicates the X coordinate of this gesture. */
    public clientX: Number;

    /* Indicates the Y coordinate of this gesture. */
    public clientY: Number;

    /* Indicates whether or not this gesture recognizer is enabled. */
    public enabled: boolean;

    /* The list of functions to call when this gesture is recognized. */
    public gestureCallbacks: Array<any>;

    /* Indicates the currently pressed moused buttons as a bitmask. */
    public mouseButtonMask: Number;

    /* Indicates this gesture's current state. */
    public state: string;

    /* Indicates the document element this gesture recognizer observes for UI events. */
    public target: any;

    /* Indicates the number of active touches. */
    public touchCount: Number;

    /* Indicates this gesture's translation along the X axis since the gesture started. */
    public translationX: Number;

    /* Indicates this gesture's translation along the Y axis since the gesture started. */
    public translationY: Number;
  }

  /**
   * Web World Wind Image Source.
   */
  export class ImageSource {
    /** This image source's image. */
    public image: any;

    /** This image source's key. A unique key is automatically generated and assigned during construction. */
    public key: string;

    /**
     * Creates an instance of ImageSource.
     * 
     * @param {*} image The image for this image source.
     */
    constructor(image: any);
  }

  export class ViewControlsLayer extends Layer {
    public placement: any;

    public showHeadingControl: any;
    public showTiltControl: any;
    public showExaggerationControl: any;
    public enabled: boolean;
    constructor(p1: any);
  }

  export class CompassLayer extends Layer {
    public placement: any;

    public compass: any;
    
    public enabled: boolean;
  }

  export class Sector {
    public deltaLatitude(): any;

    public deltaLongitude(): any;
  
    constructor(p1: any, p2: any, p3: any, p4: any);
  }

  export class Compass {
    size: number;

    constructor(p1: any, p2: any);
  }

  export class SurfaceImage {
    public displayName: string;
    constructor(p1: any, p2: any);
  }

  
  export class SurfaceShape extends Renderable {
    public attributes: ShapeAttributes;
  }

  export class SurfacePolygon extends SurfaceShape {
    constructor(boundary: WorldWind.Location[], attributes: ShapeAttributes);

    public boundaries: WorldWind.Location[];
  }


  export class ProjectionMercator {

  }
  
  export class ProjectionEquirectangular {

  }

  export class Globe {
    constructor(p1: any);
  }

  export class ZeroElevationModel {
    
  }

  export class SurfaceEllipse {
    constructor(p1: any, p2: any, p3: any, p4: any, p5: any);
  }

  export class GoToAnimator {
    travelTime: number;
    
    constructor(p1: any);

    goTo(location: WorldWind.Location, callback: any): void;
  }

  export class EarthRestElevationModel {
    constructor(p1: any, p2: any);
  }

  export class PickedObject {
    color: Color;
    position: Position;
    parentLayer: Layer;
    isTerrain: boolean;
    userObject: any;
  }
}
