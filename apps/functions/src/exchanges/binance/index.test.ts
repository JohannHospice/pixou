import Binance from './index'
import dotenv from 'dotenv'
dotenv .config()

describe('truv', ()=>{
  const binance = new Binance()

  beforeAll(() => {
    
  })
  it('truc', () => {
    binance.client().then(console.log)

  })
  
})