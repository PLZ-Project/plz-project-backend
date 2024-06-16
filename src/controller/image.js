const ArticleImageResponseDTO = require('@articleResponseDTO/articleImageResponseDTO')
const envProvider = require('@provider/envProvider')

exports.articleImageUpload = (req, res) => {
  try {
    if (!req.files) {
      throw new Error('이미지를 업로드하지 않으셨습니다.')
    }

    const responseDTO = req.files.map(
      (file) =>
        new ArticleImageResponseDTO({
          filename: file.filename,
          path: `http://${envProvider.common.endPoint}:${envProvider.common.port}/${file.savedFilePath}`
        })
    )

    res.status(200).json(responseDTO)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
