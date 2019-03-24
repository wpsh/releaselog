import axios from 'axios'
import changelogBuilder from '../main.js'

jest.mock('axios')

const apiResponseMock = [
  {
    'draft': false,
    'prerelease': false,
    'name': 'Version 1.6.0',
    'created_at': '2019-03-19T14:50:49Z',
    'published_at': '2019-03-19T14:52:31Z',
    'body': '- One log.\r\n\r\n- Mark as tested with WordPress 5.1.'
  },
  {
    'draft': false,
    'prerelease': false,
    'name': 'Version 0.3.0',
    'created_at': '2018-11-06T08:39:18Z',
    'published_at': '2018-11-06T08:40:14Z',
    'body': '- Mark as tested with WordPress 5.0.\r\n\r\n- Always post the two-factor login.'
  },
  {
    'draft': true,
    'prerelease': true,
    'name': 'Version 0.2.0',
    'created_at': '2018-10-16T07:23:28Z',
    'published_at': '2018-10-16T07:27:19Z',
    'body': '- Add developer tools for deploying to WP.org manually.'
  }
]

describe('releaselog', () => {
  axios.get = jest.fn().mockResolvedValue(apiResponseMock)

  it('can extract and format changelog', async () => {
    const changelog = await changelogBuilder('dummy/repo')

    expect(changelog).toBe('## Version 1.6.0 (2019-2-19)\n\n- One log.\r\n\r\n- Mark as tested with WordPress 5.1.\n\n## Version 0.3.0 (2018-10-6)\n\n- Mark as tested with WordPress 5.0.\r\n\r\n- Always post the two-factor login.')
  })

  it('can use custom formatter', async () => {
    const formatter = (entry) => {
      return entry.name
    }

    const changelog = await changelogBuilder('dummy/repo', formatter)

    expect(changelog).toBe('Version 1.6.0\n\nVersion 0.3.0')
  })
})
