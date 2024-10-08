export default function signin ({clientId}) {
  const endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  const search = '?' + new URLSearchParams({
    client_id: clientId,
    redirect_uri: 'https://hcratch3.github.io/ControlPanel/drive/upload/',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/drive.file',
  })

  window.location.assign(endpoint + search)
}
