// src/services/documentApi.js

export async function uploadDocuments(files) {
  const formData = new FormData()

  // IMPORTANT: key name MUST be "files"
  files.forEach(file => {
    formData.append("files", file)
  })

  const res = await fetch("https://adityaprakashsingh01-infomate.hf.space/api/v1/documents/upload", {
    method: "POST",
    body: formData
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText)
  }

  return res.json()
}

