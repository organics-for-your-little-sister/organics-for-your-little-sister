import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AuthForm, mapLogin } from './auth-form'

describe('Authform component', () => {

  describe('mapLogin', () => {
    let fakeLogin = {
      user: {error: 'this is an error'}
    }
    it('should return an login object', () => {
      expect(mapLogin(fakeLogin).name).to.be.equal('login')
    })
  })

})
