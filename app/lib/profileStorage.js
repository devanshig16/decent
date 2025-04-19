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




import { BigNumber } from 'ethers'; // optional if not already imported

export async function saveCandidateProfile(form) {
  try {
    const { contract, signer } = await getContract();
    const signerAddress = await signer.getAddress();

    const currentRole = await contract.getRole(signerAddress);
    const roleValue = parseInt(currentRole.toString());

    console.log('Signer address:', signerAddress);
    console.log('Current role:', roleValue);

    if (roleValue === 0) { // ✅ only register if role is 0 (not registered)
      console.log('Registering as candidate...');
      const regTx = await contract.registerAsCandidate();
      await regTx.wait();
    } else if (roleValue !== 1) {
      throw new Error('You must be a candidate to update this profile.');
    }

    const tx = await contract.setCandidateProfile(
      form.name,
      form.bio,
      form.skills,
      form.image
    );
    await tx.wait();

    return tx;
  } catch (err) {
    console.error('Error saving profile: ', err);
    throw new Error('Error saving profile: ' + (err.reason || err.message));
  }
}


  
