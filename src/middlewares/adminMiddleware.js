const pool = require('../db/database');

const verificarAdmin = async (req, res, next) => {
    try {
        const userId = req.usuario.id;
        const result = await pool.query('SELECT role FROM tb_stc_user_roles WHERE id = (SELECT role_id FROM users WHERE id = $1)', [userId]);
        
        if (result.rows.length > 0 && result.rows[0].role === 'adm') {
            next();
        } else {
            res.status(403).json('Ação proibida');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = verificarAdmin;
