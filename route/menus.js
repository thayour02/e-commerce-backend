const express = require('express')

const router = express.Router()


const {allMenu,addMenu,deleteMenu,updateMenu ,getMenuById} = require('../controller/menu')

router.get('/menus', allMenu)
router.post('/addMenu', addMenu)
router.delete('/delete-item/:id', deleteMenu)
router.get('/menu-item/:id', getMenuById)
router.put('/update-item/:id', updateMenu )


module.exports = router