import Uint from './uint'
import { NUMBER } from './fieldTypes'

describe('uint', () => {
  let f

  beforeEach(() => {
    f = new Uint('uint')
  })

  it('has a field type', () => {
    expect(f.fieldType()).toEqual(NUMBER)
  })

  it('has placeholder text', () => {
    expect(f.placeholderText()).toEqual('123...')
  })

  it('has a validator', () => {
    expect(f.isValid()).toEqual(false)
    expect(f.isValid(null)).toEqual(false)
    expect(f.isValid('abc')).toEqual(false)
    expect(f.isValid('123')).toEqual(true)
    expect(f.isValid('1232342233234234')).toEqual(true)

    f = new Uint('uint8')
    expect(f.isValid('123')).toEqual(true)
    expect(f.isValid('-123')).toEqual(false)
    expect(f.isValid('65535')).toEqual(false)
    expect(f.isValid('1232342233234234')).toEqual(false)

    f = new Uint('uint16')
    expect(f.isValid('123')).toEqual(true)
    expect(f.isValid('65535')).toEqual(true)
    expect(f.isValid('-65535')).toEqual(false)
    expect(f.isValid('1232342233234234')).toEqual(false)
  })

  it('has a sanitizer', () => {
    expect(f.sanitize()).toEqual('')
    expect(f.sanitize('123')).toEqual('123')
    expect(f.sanitize('  123 ')).toEqual('123')
  })
})
