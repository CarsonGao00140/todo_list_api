import paseto from 'paseto'
const { V4: { generateKey, sign, verify: pasetoVerify } } = paseto;

const { publicKey, secretKey } = await generateKey('public', { format: 'paserk' });

export const issue = (email: string) => {
    return sign({ email }, secretKey)
};

export const verify = async (token: string): Promise<string | null> => {
    try {
        const { email }: { email: string } = await pasetoVerify(token, publicKey);
        return email
    } catch (error) {
        return null
    }
}
