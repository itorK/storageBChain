"GET /uuid-beacon";
/**
 * @api {get} /uuid-beacon Get list of uuids
 * @apiName UuidBeacon
 * @apiGroup UuidBeacon
 *
 * @apiSuccess {String} uuid uuid.
 * @apiSuccess {String} major major.
 * @apiSuccess {String} minor minor.
 * @apiSuccess {String} color color.
 * @apiSuccess {String} department department.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * {
 * uuidBeacon: [{
 *      _id: "59ca410ca5e9da07b4b7aba2",
 *      uuid: "test",
 *      major: "42259",
 *      minor: "z",
 *      color: "BLUE",
 *      __v: 0
 * }],
 * success: true
 * }
 *
 */
"POST /uuid-beacon";
/**
* @api {post} /uuid-beacon Post uuid
* @apiName UuidBeaconPost
* @apiGroup UuidBeacon
*
* @apiParam {String} uuid uuid.
* @apiParam {String} major major.
* @apiParam {String} minor minor.
* @apiParam {String} color color.
* @apiExample Example usage:
* endpoint: http://localhost/uuid-beacon
* { "uuid": "1111", "major": "1111", "minor": "z", "color": "DARK_BLUE" }
*/
"DELETE /uuid-beacon";
/**
* @api {delete} /uuid-beacon Delete uuid
* @apiName UuidBeaconDelete
* @apiGroup UuidBeacon
*
* @apiParam {Number} id id of uuidBeacon to remove.
* @apiExample Example usage:
* endpoint: http://localhost/uuid-beacon
* id=59ca3fce310d3f310049c064
*/
"POST /client-enter"; // kiedy niepełnosprawny wchodzi do oddziału beacon wysyła posta
/**
* @api {post} /client-enter Post info abot client with disability that enters depratment
* @apiName ClientEnter
* @apiGroup ClientEnter
*
* @apiParam {Object} beacon beacon.
* @apiParam {String} beacon.uuid uuid.
* @apiParam {String} beacon.major major.
* @apiParam {String} nik client's nik.
* @apiExample Example usage:
* endpoint: http://localhost/client-enter
*
*{ "beacon": { "uuid": "1111", "major": "1111" }, "nik": "1111" }
*/
"POST /customer";
/**
* @api {post} /customer Post info abot customer with disability
* @apiName CustomerPOST
* @apiGroup Customer
*
* @apiParam {Number} nik nik.
* @apiParam {String} photo photo.
* @apiParam {Date} date date.
* @apiParam {disType} disType type of disability.
* @apiExample Example usage:
* endpoint: http://localhost/client-enter
* { "nik": "1111", "photo": "Blair", "date": "Tue Mar 10 2015 05:52:22 GMT+0100 (Środkowoeuropejski czas stand.)", "disType": "niewidomy" }
*/
"GET /customer";
/**
 * @api {get} /customer Get list of customers
 * @apiName Customer
 * @apiGroup Customer
 *
* @apiParam {Number} nik nik.
* @apiParam {String} photo photo.
* @apiParam {Date} date date.
* @apiParam {disType} disType type of disability.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * {
 * uuidBeacon: [{
 *      _id: "59ca410ca5e9da07b4b7aba2",
 *      nik: "123456789",
 *      photo: "zzz",
 *      date: "Tue Feb 03 1981 16:39:46 GMT+0100 (Środkowoeuropejski czas stand.)",
 *      disType: "niewidomy",
 *      __v: 0
 * }],
 * success: true
 * }
 *
 */
"POST /department";
/**
* @api {post} /department Add department
* @apiName DepartmentPOST
* @apiGroup Department
*
* @apiParam {Object} beacon beacon.
* @apiParam {String} beacon.uuid uuid.
* @apiParam {String} beacon.major major.
* @apiParam {String[]} computers list of IPs to push notification.
* @apiExample Example usage:
* endpoint: http://localhost/client-enter
* { "computers": [ "127" ], "beacon": { "uuid": "1111", "major": "1111" } }
*/
"GET /department";
//# sourceMappingURL=apidoc.js.map