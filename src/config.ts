export default {
  plasmaContracts: {
    // BytesLib: '0xde5807d201788dB32C38a6CE0F11d31b1aeB822a',
    // Common: '0x84Dc17F28658Bc74125C7E82299992429ED34c12',
    // ECVerify: '0xccd1d8d16F462f9d281024CBD3eF52BADB10131C',
    // Merkle: '0xCD87Be2Df3de01EA23666c97104613ec252300E8',
    // MerklePatriciaProof: '0x3a0Db8fa2805DEcd49cCAa839DaC15455498EDE2',
    // PriorityQueue: '0xD26361204b8e4a4bb16668bfE7A1b9106AD17140',
    // RLPEncode: '0xDE0D18799a20f29d9618f8DDbf4c2b029FAdc491',
    // RLPReader: '0xA5e463c187E53da5b193E2beBca702e9fEeA3738',
    // SafeMath: '0x1bEb355BE0577E61870C4c57DAaa6e2129dd0604',
    // Governance: '0x03Ac67D03A06571A059F20425FFD1BEa300d98C2',
    // GovernanceProxy: '0xAcdEADEE4c054A86F5b1e8705126b30Ec999899B',
    // Registry: '0xeE11713Fe713b2BfF2942452517483654078154D',
    // RootChain: '0x77f32d6c7bf3639b2f59c6843420e80e9e3a86af',
    // RootChainProxy: '0x2890bA17EfE978480615e330ecB65333b880928e',
    // ValidatorShareFactory: '0x5737AD9095AB4d55FeE7F972ea7F86734695E3c1',
    // StakingInfo: '0x29C40836C17f22d16a7fE953Fb25DA670C96d69E',
    // StakingNFT: '0x532c7020E0F3666f9440B8B9d899A9763BCc5dB7',
    // StakeManager: '0xc1b9b1ff63ef14502f7c6c8e9f5eed47654695ae',
    // StakeManagerProxy: '0x00200eA4Ee292E253E6Ca07dBA5EdC07c8Aa37A3',
    // SlashingManager: '0xDD17DE137c7Cc288E022fE95a3B398C94BDd5b83',
    // ValidatorShare: '0xa7957328580692f6440948c3c479a9cde17de206',
    // StateSender: '0xEAa852323826C71cd7920C3b4c007184234c3945',
    // DepositManager: '0x20339c5Ea91D680E681B9374Fc0a558D5b96a026',
    // DepositManagerProxy: '0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96',
    // WithdrawManager: '0xb075cdda944d4e1ff19f2201cdc3a440a11d4710',
    // WithdrawManagerProxy: '0x2923C8dD6Cdf6b2507ef91de74F1d5E0F11Eac53',
    // ExitNFT: '0xE2Ab047326B38e4DDb6791551e8d593D30E02724',
    // ERC20Predicate: '0xf213e8ff5d797ed2b052d3b96c11ac71db358027',
    // ERC721Predicate: '0x473cb675c9214f79dee10948443509c441a678e7',
    tokens: {
      MaticToken: '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
      TestToken: '0x3f152B63Ec5CA5831061B2DccFb29a874C317502',
      RootERC721: '0xfA08B72137eF907dEB3F202a60EfBc610D2f224b',
      MaticWeth: '0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc',
    },
  },
  PoSContracts: {
    root: {
      POSRootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
      DERC20: '0x655F2166b0709cd575202630952D71E2bB0d61Af',
      DERC721: '0x084297B12F204Adb74c689be08302FA3f12dB8A7',
      DERC1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
      posERC20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
      posERC721Predicate: '0x74D83801586E9D3C4dc45FfCD30B54eA9C88cf9b',
      posERC1155Predicate: '0xB19a86ba1b50f0A395BfdC3557608789ee184dC8',
      posEtherPredicate: '0xe2B01f3978c03D6DdA5aE36b2f3Ac0d66C54a6D5',
    },
    child: {
      DERC20: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
      DERC721: '0x757b1BD7C12B81b52650463e7753d7f5D0565C0e',
      DERC1155: '0xA07e45A987F19E25176c877d98388878622623FA',
      MaticWETH: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
    },
  },
  maticRpc: 'https://matic-mumbai.chainstacklabs.com',
  ethereumRpc: 'https://goerli.infura.io/v3/461d43c12f0f4ae0acd6b531dcbf22c8',
  version: 'mumbai',
  network: 'testnet',
  maticChainId: 80001,
  ethereumChainId: 5,
};
