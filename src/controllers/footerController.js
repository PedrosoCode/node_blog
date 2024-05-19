const pool = require('../db/database');

const obterFooterContent = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tb_info_footer LIMIT 1');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const atualizarFooterContent = async (req, res) => {
    try {
        const { about_us_title, about_us_description, contact_title, contact_phone, contact_email, socials_title, socials_instagram, socials_whatsapp, socials_linkedin } = req.body;
        await pool.query(
            'UPDATE tb_info_footer SET about_us_title = $1, about_us_description = $2, contact_title = $3, contact_phone = $4, contact_email = $5, socials_title = $6, socials_instagram = $7, socials_whatsapp = $8, socials_linkedin = $9',
            [about_us_title, about_us_description, contact_title, contact_phone, contact_email, socials_title, socials_instagram, socials_whatsapp, socials_linkedin]
        );
        res.json('Footer atualizado com sucesso');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    obterFooterContent,
    atualizarFooterContent,
};
