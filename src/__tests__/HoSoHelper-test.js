/////////////////////////////////////
///////// BUILD-STRING /////////////
///////////////////////////////////

const { default: HoSoHelper } = require('../helpers/HoSoHelper');

test('AUTH_MANUAL_LOGIN', () => {
  expect(
    HoSoHelper.buildHoSoString(
      { username: 'mario', password: 'password' },
      { type: 'AUTH_MANUAL_LOGIN' }
    )
  ).toEqual('103::mario::password');
});
test('AUTH_AUTO_LOGIN', () => {
  expect(
    HoSoHelper.buildHoSoString(
      { username: 'mario', token: 'A765D5SD6S5S6' },
      { type: 'AUTH_AUTO_LOGIN' }
    )
  ).toEqual('103::mario::A765D5SD6S5S6');
});
test('AUTH_LOG_OUT', () => {
  expect(HoSoHelper.buildHoSoString({}, { type: 'AUTH_LOG_OUT' })).toEqual(
    '105::'
  );
});
test('GADGET_FETCH_GADGETS_LIST', () => {
  expect(
    HoSoHelper.buildHoSoString({}, { type: 'GADGET_FETCH_GADGETS_LIST' })
  ).toEqual('301::');
});
test('GADGET_FETCH_GADGETS_GROUPS', () => {
  expect(
    HoSoHelper.buildHoSoString({}, { type: 'GADGET_FETCH_GADGETS_GROUPS' })
  ).toEqual('370::');
});
test('GADGET_ALTER_GADGET', () => {
  expect(
    HoSoHelper.buildHoSoString(
      { gadgetID: '1', newState: '0.0' },
      { type: 'GADGET_ALTER_GADGET' }
    )
  ).toEqual('311::1::0.0');
});
test('GLOBAL_PING', () => {
  expect(HoSoHelper.buildHoSoString({}, { type: 'GLOBAL_PING' })).toEqual(
    'ping::'
  );
});
