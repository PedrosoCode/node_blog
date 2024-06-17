// src/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail que você esteja usando
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarEmailPedido = (email, pedido_id, itens, total) => {
    const itensTabela = itens.map(item => `
        <tr>
            <td>${item.produto_id}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco_unitario * item.quantidade).toFixed(2)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Informações do pedido fechado - Pedido Nº ${pedido_id}`,
        html: `
            <h1>Obrigado por comprar conosco!</h1>
            <p>Informações do pedido fechado (número do pedido): ${pedido_id}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Produto ID</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itensTabela}
                </tbody>
            </table>
            <p>Total do pedido: R$ ${total.toFixed(2)}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Erro ao enviar e-mail:', error);
        }
        console.log('E-mail enviado:', info.response);
    });
};

module.exports = { enviarEmailPedido };
