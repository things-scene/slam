var {
  Component
} = scene;

export default (superclass) => {
  var A = class extends MO(superclass) {
    /*
     * GEOLocation 정보를 반환한다.
     * return Position 객체
     *
     * Position 객체는 아래의 프로퍼티를 갖는 자바스크립트 객체입니다 :
     * - coords: Coordinates 객체, 현재의 위치를 정의하는 객체.
     * - timestamp: 위치를 수집한 시간을 표현하는 숫자
     *
     * Coordinates 객체는 아래의 프러퍼티를 갖는 자바스크립트 객체입니다 :
     * - latitude: 위도, 소수점을 포함하는 숫자.
     * - longitude: 경도, 소수점을 포함하는 숫자.
     * - altitude: 고도, 해수면을 기준으로 미터 단위, null 일 수 도 있습니다.
     * - accuracy: 미터로 위도와 경도의 정확도를 나타내는 숫자.
     * - altitudeAccuracy: 미터로 고도의 정확도를 나타내는 숫자, null 일 수 도 있습니다.
     * - heading: 장치가 움직이는 방향을 나타내는 숫자. 이 값은 정북에서 벗어난 각을 나타냅니다. 0도는 정북향을 나타내며 방향은 시계방향(동쪽은 90도이고, 서쪽은 270도라는 의미)입니다.speed 값이 0이면 heading 값은 NaN이 됩니다. 장치에서 heading 정보를 제공 할 수 없을 때 이 값은 null이 됩니다.
     * - speed: 장치의 속도를 나타내며, 초당 미터 값을 숫자로 나타냅니다. 이 값은 null 일 수 도 있습니다.
     */
    get geolocation() {
    }

    set geolocation(position) {
    }

    /*
     * 움직이는 오브젝트의 yaw, roll, pitch 정보를 제공한다.
     * yaw, roll, pitch 속성을 가진 오브젝트를 반환한다.
     */
    get pose() {
    }

    set pose(pose) {
    }
  }

  Component.memoize(A.prototype, 'geolocation', false);

  return A
}
