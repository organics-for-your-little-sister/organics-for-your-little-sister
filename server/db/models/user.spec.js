/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })


  describe('User Model Name', () => {

  let user;
  beforeEach(() => {
    user = User.build({
      firstName: 'Becka',
      lastName: 'Rebecca',
      email: 'BeckaRebecca@oeij.com',
      mailingAddressStreet: '35 First Ave',
      mailingAddressCity: 'New York',
      mailingAddressState: 'NY',
      mailingAddressZipCode: '10019',
      paymentInfoCardNumber: '9483746392847382',
      paymentInfoName: 'Becka Rebecca',
      paymentInfoMonth: 8,
      paymentInfoYear: 2019,
      password: 'badpassword'
    })
  })
  describe('attributes definition', () => {
    it('includes `firstName`, `lastName`, `email`, `mailingAddressStreet`, `mailingAddressCity`, `mailingAddressState`, `mailingAddressZipCode`, `paymentInfoCardNumber`, `paymentInfoName`, `paymentInfoMonth`, and `paymentInfoYear` fields', () => {
      return user.save()
        .then(savedUser => {
          expect(savedUser.firstName).to.equal('Becka');
          expect(savedUser.email).to.equal('BeckaRebecca@oeij.com');
          expect(savedUser.mailingAddressCity).to.equal('New York');
          expect(savedUser.paymentInfoCardNumber).to.equal('9483746392847382');
          expect(savedUser.paymentInfoMonth).to.equal(8);
        })
    })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Becka',
          lastName: 'Rebecca',
          mailingAddressStreet: '35 First Ave',
          mailingAddressCity: 'New York',
          mailingAddressState: 'NY',
          mailingAddressZipCode: '10019',
          paymentInfoCardNumber: '9483746392847382',
          paymentInfoName: 'Becka Rebecca',
          paymentInfoMonth: 8,
          paymentInfoYear: 2019
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

})

})
