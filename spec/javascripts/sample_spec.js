describe ("Sample", function () {
  it ('cleans the number by removing spaces and dashes', function () {
    expect (Sample.cleanNumber('123 4-5')).toEqual('12345');
  });
  it ('validates based on mod 10', function() {
    expect (Sample.validNumber('4111 1111 1111-1111')).toBeTruthy();
    expect (Sample.validNumber('4111 1111 1111-1121')).toBeFalsy();
  });
});
