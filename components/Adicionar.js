import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, ScrollView, Switch } from 'react-native';
import { firestore } from '../db/firestore';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const fieldLabels = {
    freioDePe: 'Freio de Pé',
    buzina: 'Buzina',
    chaveDeRoda: 'Chave de Roda',
    cintoDeSeguranca: 'Cinto de Segurança',
    condicoesDosPneus: 'Condições dos Pneus',
    espelhosRetrovisores: 'Espelhos Retrovisores',
    extintorDeSeguranca: 'Extintor de Segurança',
    farois: 'Faróis',
    freioDeEstacionamento: 'Freio de Estacionamento',
    indicadoresDePainel: 'Indicadores de Painel',
    lataria: 'Lataria',
    lavadorDeParaBrisa: 'Lavador de Para-Brisa',
    limpadorDeParaBrisa: 'Limpador de Para-Brisa',
    luzDeFreio: 'Luz de Freio',
    luzDeRe: 'Luz de Ré',
    macaco: 'Macaco',
    motorDePartida: 'Motor de Partida',
    nivelDeAgua: 'Nível de Água',
    nivelDeOleo: 'Nível de Óleo',
    pneuEstoque: 'Pneu Estoque',
    portas: 'Portas',
    ruidoInterno: 'Ruído Interno',
    setasDianteiras: 'Setas Dianteiras',
    setasTraseiras: 'Setas Traseiras',
    trianguloDeAdvertencia: 'Triângulo de Advertência',
    vidros: 'Vidros'
};

export default function Adicionar() {
    const [form, setForm] = useState({
        freioDePe: false,
        aprovado: false,
        buzina: false,
        chaveDeRoda: false,
        cintoDeSeguranca: false,
        condicoesDosPneus: false,
        data: new Date(),
        espelhosRetrovisores: false,
        extintorDeSeguranca: false,
        farois: false,
        freioDeEstacionamento: false,
        indicadoresDePainel: false,
        lataria: false,
        lavadorDeParaBrisa: false,
        limpadorDeParaBrisa: false,
        local: '',
        luzDeFreio: false,
        luzDeRe: false,
        macaco: false,
        modelo: '',
        motorDePartida: false,
        nivelDeAgua: false,
        nivelDeOleo: false,
        observacoes: '',
        pneuEstoque: false,
        portas: false,
        responsavel: '',
        ruidoInterno: false,
        setasDianteiras: false,
        setasTraseiras: false,
        trianguloDeAdvertencia: false,
        vidros: false,
    });

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await addDoc(collection(firestore, 'vistorias'), {
                ...form,
                data: Timestamp.fromDate(new Date(form.data)),
            });
            alert('Vistoria adicionada com sucesso!');
        } catch (error) {
            console.error("Erro ao adicionar a vistoria: ", error);
            alert('Erro ao adicionar a vistoria.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Adicionar Vistoria</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Modelo"
                    value={form.modelo}
                    onChangeText={(text) => handleChange('modelo', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Local"
                    value={form.local}
                    onChangeText={(text) => handleChange('local', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Responsável"
                    value={form.responsavel}
                    onChangeText={(text) => handleChange('responsavel', text)}
                />

                {Object.keys(fieldLabels).map((item) => (
                    <View key={item} style={styles.switchContainer}>
                        <Text style={styles.label}>{fieldLabels[item]}</Text>
                        <Switch
                            value={form[item]}
                            onValueChange={(newValue) => handleChange(item, newValue)}
                        />
                        <Text style={styles.switchLabel}>{form[item] ? 'Ok' : 'Não Ok'}</Text>
                    </View>
                ))}

                <TextInput
                    style={styles.input}
                    placeholder="Observações"
                    value={form.observacoes}
                    onChangeText={(text) => handleChange('observacoes', text)}
                />

                <Button title="Adicionar Vistoria" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    switchLabel: {
        fontSize: 16,
        color: '#555',
        marginLeft: 8,
    },
});
