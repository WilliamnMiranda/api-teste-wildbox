const multer = require('multer');
const express = require("express");
const router = express.Router();
const Post = require('../../models/post')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split('.')[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex');

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});
const upload = multer({ storage });

router.post("/", upload.single('image'), async (req, res) => {
  let { name, message } = req.body;
  const post = new Post({ message, name, image: req.file.path });
  try {
    await post.save()
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const posts = await Post.findByIdAndDelete(id)
    res.status(200).json(posts)
  } catch (e) {
    res.status(500).json({
      error: 'sorry there was an internal error'
    })
  }
})

module.exports = router;