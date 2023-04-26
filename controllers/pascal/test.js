var Test = require('../../models/test')
module.exports = {
	allMusics: (req,res) => {
		const products = Test.find({}, (err, result) => {
			if(result){
				res.json({
					musics: result
				})
			}
			else{
				res.json({
					error: err
				})
			}

		}).sort( { _id: -1 } )


	},

  create : (req, res, next) => {
    const music = new Test({
      name: req.body.name,
      albums: req.body.albums,
      singers: req.body.singers
    })
    const musicCreated = music.save();
    if(music){
      res.status(201).json({
        music: product,
        msg: "Music Created Successfully"
      })
    }

  },



}
