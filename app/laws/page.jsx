const lawsData = [
  {
    category: 'Criminal Laws (New — 2023)', icon: '⚖️',
    laws: [
      { name: 'Bharatiya Nyaya Sanhita, 2023', short: 'BNS', desc: 'Replaced IPC — New criminal code of India from July 2024', url: 'https://www.indiacode.nic.in/bitstream/123456789/20062/1/a202345.pdf' },
      { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', short: 'BNSS', desc: 'Replaced CrPC — New criminal procedure code from July 2024', url: 'https://www.indiacode.nic.in/bitstream/123456789/20099/1/eng.pdf' },
      { name: 'Bharatiya Sakshya Adhiniyam, 2023', short: 'BSA', desc: 'Replaced Evidence Act — New evidence law from July 2024', url: 'https://www.indiacode.nic.in/handle/123456789/20063' },
    ]
  },
  {
    category: 'Criminal Laws (Old)', icon: '📜',
    laws: [
      { name: 'Indian Penal Code, 1860', short: 'IPC', desc: 'Old criminal code — replaced by BNS 2023', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1860-45.pdf' },
      { name: 'Code of Criminal Procedure, 1973', short: 'CrPC', desc: 'Old criminal procedure — replaced by BNSS 2023', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1974-02.pdf' },
      { name: 'Indian Evidence Act, 1872', short: 'IEA', desc: 'Old evidence law — replaced by BSA 2023', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1872-1.pdf' },
      { name: 'Prevention of Corruption Act, 1988', short: 'PCA', desc: 'Law against corruption by public servants', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1988-49.pdf' },
      { name: 'NDPS Act, 1985', short: 'NDPS', desc: 'Narcotic Drugs and Psychotropic Substances Act', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1985-61.pdf' },
      { name: 'POCSO Act, 2012', short: 'POCSO', desc: 'Protection of children from sexual abuse', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2012-32.pdf' },
    ]
  },
  {
    category: 'Constitutional Laws', icon: '🏛️',
    laws: [
      { name: 'Constitution of India, 1950', short: 'COI', desc: 'Supreme law of India — Fundamental Rights, DPSP, Duties', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1950-00.pdf' },
      { name: 'Right to Information Act, 2005', short: 'RTI', desc: 'Citizens right to access information from government', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2005-22.pdf' },
      { name: 'Protection of Human Rights Act, 1993', short: 'PHRA', desc: 'Establishment of National Human Rights Commission', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1994-10.pdf' },
      { name: 'SC/ST (Prevention of Atrocities) Act, 1989', short: 'SC/ST Act', desc: 'Prevention of atrocities against SC/ST communities', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1989-33.pdf' },
    ]
  },
  {
    category: 'Family Laws', icon: '👨‍👩‍👧',
    laws: [
      { name: 'Hindu Marriage Act, 1955', short: 'HMA', desc: 'Marriage, divorce, maintenance for Hindus', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1955-25.pdf' },
      { name: 'Hindu Succession Act, 1956', short: 'HSA', desc: 'Inheritance and succession of property for Hindus', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1956-30.pdf' },
      { name: 'Hindu Adoption and Maintenance Act, 1956', short: 'HAMA', desc: 'Adoption and maintenance rights for Hindus', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1956-78.pdf' },
      { name: 'Special Marriage Act, 1954', short: 'SMA', desc: 'Civil marriage for all religions', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1954-43.pdf' },
      { name: 'Domestic Violence Act, 2005', short: 'PWDVA', desc: 'Protection of women from domestic violence', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2005-43.pdf' },
      { name: 'Dowry Prohibition Act, 1961', short: 'DPA', desc: 'Prohibition of giving and taking dowry', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1961-28.pdf' },
      { name: 'Muslim Personal Law (Shariat) Application Act, 1937', short: 'MPLSA', desc: 'Application of Muslim personal law in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1937-26.pdf' },
      { name: 'Guardianship and Wards Act, 1890', short: 'GWA', desc: 'Guardianship of minor children', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1890-08.pdf' },
    ]
  },
  {
    category: 'Civil Laws', icon: '📋',
    laws: [
      { name: 'Code of Civil Procedure, 1908', short: 'CPC', desc: 'Procedure for civil courts in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1908-05.pdf' },
      { name: 'Indian Contract Act, 1872', short: 'ICA', desc: 'Law governing contracts and agreements', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1872-09.pdf' },
      { name: 'Transfer of Property Act, 1882', short: 'TPA', desc: 'Law regarding transfer of property', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1882-04.pdf' },
      { name: 'Limitation Act, 1963', short: 'LA', desc: 'Time limits for filing suits and appeals', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1963-36.pdf' },
      { name: 'Specific Relief Act, 1963', short: 'SRA', desc: 'Relief for breach of contract and property disputes', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1963-47.pdf' },
      { name: 'Registration Act, 1908', short: 'RA', desc: 'Registration of documents and properties', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1908-16.pdf' },
    ]
  },
  {
    category: 'Consumer and Commercial Laws', icon: '🛒',
    laws: [
      { name: 'Consumer Protection Act, 2019', short: 'CPA', desc: 'Protection of consumer rights and interests', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2019-35.pdf' },
      { name: 'Competition Act, 2002', short: 'CA', desc: 'Prevention of monopolies and unfair trade practices', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2002-12.pdf' },
      { name: 'Sale of Goods Act, 1930', short: 'SOGA', desc: 'Law governing sale and purchase of goods', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1930-03.pdf' },
      { name: 'Companies Act, 2013', short: 'CoA', desc: 'Incorporation and regulation of companies', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2013-18.pdf' },
      { name: 'Information Technology Act, 2000', short: 'ITA', desc: 'Cyber laws and electronic commerce in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2000-21.pdf' },
      { name: 'Insolvency and Bankruptcy Code, 2016', short: 'IBC', desc: 'Resolution of insolvency for companies and individuals', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2016-31.pdf' },
    ]
  },
  {
    category: 'Labour Laws', icon: '👷',
    laws: [
      { name: 'Factories Act, 1948', short: 'FA', desc: 'Health, safety and welfare of factory workers', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1948-63.pdf' },
      { name: 'Minimum Wages Act, 1948', short: 'MWA', desc: 'Fixing minimum wages for workers', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1948-11.pdf' },
      { name: 'Payment of Wages Act, 1936', short: 'PWA', desc: 'Regulation of payment of wages to workers', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1936-04.pdf' },
      { name: 'Employees Provident Fund Act, 1952', short: 'EPF', desc: 'Provident fund benefits for employees', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1952-19.pdf' },
      { name: 'Maternity Benefit Act, 1961', short: 'MBA', desc: 'Maternity leave and benefits for women employees', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1961-53.pdf' },
      { name: 'POSH Act, 2013', short: 'POSH', desc: 'Prevention of sexual harassment at workplace', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2013-14.pdf' },
    ]
  },
  {
    category: 'Environmental Laws', icon: '🌿',
    laws: [
      { name: 'Environment Protection Act, 1986', short: 'EPA', desc: 'Protection and improvement of environment', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1986-29.pdf' },
      { name: 'Water Prevention and Control of Pollution Act, 1974', short: 'Water Act', desc: 'Prevention of water pollution', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1974-06.pdf' },
      { name: 'Air Prevention and Control of Pollution Act, 1981', short: 'Air Act', desc: 'Prevention of air pollution', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1981-14.pdf' },
      { name: 'Forest Conservation Act, 1980', short: 'FCA', desc: 'Conservation of forests in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1980-69.pdf' },
      { name: 'Wildlife Protection Act, 1972', short: 'WPA', desc: 'Protection of wildlife and biodiversity', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1972-53.pdf' },
      { name: 'National Green Tribunal Act, 2010', short: 'NGT', desc: 'Tribunal for environmental disputes', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2010-19.pdf' },
    ]
  },
  {
    category: 'Property and Land Laws', icon: '🏘️',
    laws: [
      { name: 'Real Estate Regulation Act, 2016', short: 'RERA', desc: 'Regulation of real estate sector and protection of buyers', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2016-16.pdf' },
      { name: 'Land Acquisition Act, 2013', short: 'LAA', desc: 'Acquisition of land by government with fair compensation', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2013-30.pdf' },
      { name: 'Benami Transactions Prohibition Act, 1988', short: 'BTPA', desc: 'Prohibition of benami property transactions', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1988-45.pdf' },
    ]
  },
  {
    category: 'Medical and Social Laws', icon: '🏥',
    laws: [
      { name: 'Surrogacy Regulation Act, 2021', short: 'SRA', desc: 'Regulation of surrogacy in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2021-47.pdf' },
      { name: 'Mental Healthcare Act, 2017', short: 'MHA', desc: 'Rights of persons with mental illness', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2017-10.pdf' },
      { name: 'Rights of Persons with Disabilities Act, 2016', short: 'RPWD', desc: 'Rights and protection of disabled persons', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2016-49.pdf' },
      { name: 'PCPNDT Act, 1994', short: 'PCPNDT', desc: 'Prevention of sex-selective abortion', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1994-57.pdf' },
      { name: 'Medical Termination of Pregnancy Act, 1971', short: 'MTP', desc: 'Regulation of abortion in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1971-34.pdf' },
    ]
  },
  {
    category: 'Education Laws', icon: '🎓',
    laws: [
      { name: 'Right to Education Act, 2009', short: 'RTE', desc: 'Free and compulsory education for children 6-14 years', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A2009-35.pdf' },
      { name: 'University Grants Commission Act, 1956', short: 'UGC', desc: 'Regulation of higher education in India', url: 'https://www.indiacode.nic.in/repealedfileopen?rfilename=A1956-03.pdf' },
    ]
  },
];