import { getContract } from './contract';

export async function getCandidateProfile(wallet) {
  try {
    const { contract } = await getContract(); // ✅ destructure to get contract

    const [name, bio, skills, image, exists] = await contract.getCandidateProfile(wallet);

    if (!exists || !name) return null;

    return { name, bio, skills, image, wallet };
  } catch (err) {
    console.error('Error fetching profile: ', err);
    return null;
  }
}




export async function saveCandidateProfile(form) {
  try {
    const { contract, signer } = await getContract(); // ✅ get both

    const signerAddress = await signer.getAddress(); // ✅ this won't fail now
    const currentRole = await contract.getRole(signerAddress);

    console.log('Signer address:', signerAddress);
    console.log('Current role:', currentRole.toString());

    if (parseInt(currentRole) !== 1) {
      console.log('Registering as candidate...');
      const regTx = await contract.registerAsCandidate();
      await regTx.wait();
    }

    const tx = await contract.setCandidateProfile(form.name, form.bio, form.skills, form.image);
    await tx.wait();

    return tx;
  } catch (err) {
    console.error('Error saving profile: ', err);
    throw new Error('Error saving profile: ' + err.message);
  }
}

  
