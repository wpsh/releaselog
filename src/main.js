import { get } from 'axios'

export function buildApiUrl (repoSlug) {
  return `https://api.github.com/repos/${repoSlug}/releases`
}

export function formatRelease (release) {
  const releaseDate = new Date(release.published_at)

  const releaseDateFormatted = [
    releaseDate.getFullYear(),
    String(releaseDate.getMonth() + 1).padStart(2, '0'),
    String(releaseDate.getDate()).padStart(2, '0')
  ].join('-')

  return `## ${release.name} (${releaseDateFormatted})\n\n${release.body}`
}

export function formatReleases (releases, formatter) {
  return releases.filter(release => !release.prerelease && !release.draft).map(formatter).join('\n\n')
}

export default function releaselog (repoSlug, formatter = formatRelease) {
  const apiUrl = buildApiUrl(repoSlug)

  return get(apiUrl).then(response => formatReleases(response.data, formatter))
}
