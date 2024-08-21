import nextPwa from 'next-pwa';
const withPWA = nextPwa({
    dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  
};

export default withPWA(nextConfig);
