const mongoose = require('mongoose')

const agendamentoSchema = ({
    cliente: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    data: {type: Date, required: true },
    criadoEm: { type: Date, default: Date.now}
})

const agendamentoModel = mongoose.model('Agendamento', agendamentoModel)
module.exports = agendamentoModel;