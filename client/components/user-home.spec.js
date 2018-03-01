/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserHome, mapState } from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
   let userHome


  describe('mapState', () => {
    let fakeState = { user: {email: 'hello@mail.com'} }
    it('should return an email object', () => {
      expect(mapState(fakeState).email).to.be.equal('hello@mail.com')
    })
  })
//shallow wraps input in methods we can use
//wraps components w/ nice methods that allow us to test it when shallow rendered
  describe('the plain component', () => {
    userHome = shallow(<UserHome email={'johnandkate@fullstack.com'} />)

    it('should render a component with the correct email', () => {
      expect(userHome.find('h3').text()).to.be.equal('Welcome, johnandkate@fullstack.com')
    })
  })
})
