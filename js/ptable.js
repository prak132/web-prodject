new Vue({
    el: '.container',
    data() {
        return {
            squares: [
                {
                    atomicNumber: '1',
                    symbol: 'H',
                    name: 'Hydrogen',
                    atomicMass: '1.00794(4)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: '1766'
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                    atomicNumber: '2',
                    symbol: 'He',
                    name: 'Helium',
                    atomicMass: '4.002602(2)',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1868'
                },
                {
                    atomicNumber: '3',
                    symbol: 'Li',
                    name: 'Lithium',
                    atomicMass: '6.941(2)',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1817'
                },
                {
                    atomicNumber: '4',
                    symbol: 'Be',
                    name: 'Beryllium',
                    atomicMass: '9.012182(3)',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: '1798'
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                    atomicNumber: '5',
                    symbol: 'B',
                    name: 'Boron',
                    atomicMass: '10.811(7)',
                    groupBlock: 'metalloid',
                    yearDiscovered: '1807'
                },
                {
                    atomicNumber: '6',
                    symbol: 'C',
                    name: 'Carbon',
                    atomicMass: '12.0107(8)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '7',
                    symbol: 'N',
                    name: 'Nitrogen',
                    atomicMass: '14.0067(2)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: '1772'
                },
                {
                    atomicNumber: '8',
                    symbol: 'O',
                    name: 'Oxygen',
                    atomicMass: '15.9994(3)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: '1774'
                },
                {
                    atomicNumber: '9',
                    symbol: 'F',
                    name: 'Fluorine',
                    atomicMass: '18.9984032(5)',
                    groupBlock: 'halogen',
                    yearDiscovered: '1670'
                },
                {
                    atomicNumber: '10',
                    symbol: 'Ne',
                    name: 'Neon',
                    atomicMass: '20.1797(6)',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1898'
                },
                {
                    atomicNumber: '11',
                    symbol: 'Na',
                    name: 'Sodium',
                    atomicMass: '22.98976928(2)',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1807'
                },
                {
                    atomicNumber: '12',
                    symbol: 'Mg',
                    name: 'Magnesium',
                    atomicMass: '24.3050(6)',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: '1808'
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                    atomicNumber: '13',
                    symbol: 'Al',
                    name: 'Aluminum',
                    atomicMass: '26.9815386(8)',
                    groupBlock: 'metal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '14',
                    symbol: 'Si',
                    name: 'Silicon',
                    atomicMass: '28.0855(3)',
                    groupBlock: 'metalloid',
                    yearDiscovered: '1854'
                },
                {
                    atomicNumber: '15',
                    symbol: 'P',
                    name: 'Phosphorus',
                    atomicMass: '30.973762(2)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: '1669'
                },
                {
                    atomicNumber: '16',
                    symbol: 'S',
                    name: 'Sulfur',
                    atomicMass: '32.065(5)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '17',
                    symbol: 'Cl',
                    name: 'Chlorine',
                    atomicMass: '35.453(2)',
                    groupBlock: 'halogen',
                    yearDiscovered: '1774'
                },
                {
                    atomicNumber: '18',
                    symbol: 'Ar',
                    name: 'Argon',
                    atomicMass: '39.948(1)',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1894'
                },
                {
                    atomicNumber: '19',
                    symbol: 'K',
                    name: 'Potassium',
                    atomicMass: '39.0983(1)',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1807'
                },
                {
                    atomicNumber: '20',
                    symbol: 'Ca',
                    name: 'Calcium',
                    atomicMass: '40.078(4)',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '21',
                    symbol: 'Sc',
                    name: 'Scandium',
                    atomicMass: '44.955912(6)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1876'
                },
                {
                    atomicNumber: '22',
                    symbol: 'Ti',
                    name: 'Titanium',
                    atomicMass: '47.867(1)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1791'
                },
                {
                    atomicNumber: '23',
                    symbol: 'V',
                    name: 'Vanadium',
                    atomicMass: '50.9415(1)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '24',
                    symbol: 'Cr',
                    name: 'Chromium',
                    atomicMass: '51.9961(6)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '25',
                    symbol: 'Mn',
                    name: 'Manganese',
                    atomicMass: '54.938045(5)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1774'
                },
                {
                    atomicNumber: '26',
                    symbol: 'Fe',
                    name: 'Iron',
                    atomicMass: '55.845(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '27',
                    symbol: 'Co',
                    name: 'Cobalt',
                    atomicMass: '58.933195(5)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '28',
                    symbol: 'Ni',
                    name: 'Nickel',
                    atomicMass: '58.6934(4)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1751'
                },
                {
                    atomicNumber: '29',
                    symbol: 'Cu',
                    name: 'Copper',
                    atomicMass: '63.546(3)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '30',
                    symbol: 'Zn',
                    name: 'Zinc',
                    atomicMass: '65.38(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1746'
                },
                {
                    atomicNumber: '31',
                    symbol: 'Ga',
                    name: 'Gallium',
                    atomicMass: '69.723(1)',
                    groupBlock: 'metal',
                    yearDiscovered: '1875'
                },
                {
                    atomicNumber: '32',
                    symbol: 'Ge',
                    name: 'Germanium',
                    atomicMass: '72.64(1)',
                    groupBlock: 'metalloid',
                    yearDiscovered: '1886'
                },
                {
                    atomicNumber: '33',
                    symbol: 'As',
                    name: 'Arsenic',
                    atomicMass: '74.92160(2)',
                    groupBlock: 'metalloid',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '34',
                    symbol: 'Se',
                    name: 'Selenium',
                    atomicMass: '78.96(3)',
                    groupBlock: 'nonmetal',
                    yearDiscovered: '1817'
                },
                {
                    atomicNumber: '35',
                    symbol: 'Br',
                    name: 'Bromine',
                    atomicMass: '79.904(1)',
                    groupBlock: 'halogen',
                    yearDiscovered: '1826'
                },
                {
                    atomicNumber: '36',
                    symbol: 'Kr',
                    name: 'Krypton',
                    atomicMass: '83.798(2)',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1898'
                },
                {
                    atomicNumber: '37',
                    symbol: 'Rb',
                    name: 'Rubidium',
                    atomicMass: '85.4678(3)',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1861'
                },
                {
                    atomicNumber: '38',
                    symbol: 'Sr',
                    name: 'Strontium',
                    atomicMass: '87.62(1)',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: '1790'
                },
                {
                    atomicNumber: '39',
                    symbol: 'Y',
                    name: 'Yttrium',
                    atomicMass: '88.90585(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1794'
                },
                {
                    atomicNumber: '40',
                    symbol: 'Zr',
                    name: 'Zirconium',
                    atomicMass: '91.224(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1789'
                },
                {
                    atomicNumber: '41',
                    symbol: 'Nb',
                    name: 'Niobium',
                    atomicMass: '92.90638(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1801'
                },
                {
                    atomicNumber: '42',
                    symbol: 'Mo',
                    name: 'Molybdenum',
                    atomicMass: '95.96(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1778'
                },
                {
                    atomicNumber: '43',
                    symbol: 'Tc',
                    name: 'Technetium',
                    atomicMass: '[98]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1937'
                },
                {
                    atomicNumber: '44',
                    symbol: 'Ru',
                    name: 'Ruthenium',
                    atomicMass: '101.07(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1827'
                },
                {
                    atomicNumber: '45',
                    symbol: 'Rh',
                    name: 'Rhodium',
                    atomicMass: '102.90550(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '46',
                    symbol: 'Pd',
                    name: 'Palladium',
                    atomicMass: '106.42(1)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '47',
                    symbol: 'Ag',
                    name: 'Silver',
                    atomicMass: '107.8682(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '48',
                    symbol: 'Cd',
                    name: 'Cadmium',
                    atomicMass: '112.411(8)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1817'
                },
                {
                    atomicNumber: '49',
                    symbol: 'In',
                    name: 'Indium',
                    atomicMass: '114.818(3)',
                    groupBlock: 'metal',
                    yearDiscovered: '1863'
                },
                {
                    atomicNumber: '50',
                    symbol: 'Sn',
                    name: 'Tin',
                    atomicMass: '118.710(7)',
                    groupBlock: 'metal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '51',
                    symbol: 'Sb',
                    name: 'Antimony',
                    atomicMass: '121.760(1)',
                    groupBlock: 'metalloid',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '52',
                    symbol: 'Te',
                    name: 'Tellurium',
                    atomicMass: '127.60(3)',
                    groupBlock: 'metalloid',
                    yearDiscovered: '1782'
                },
                {
                    atomicNumber: '53',
                    symbol: 'I',
                    name: 'Iodine',
                    atomicMass: '126.90447(3)',
                    groupBlock: 'halogen',
                    yearDiscovered: '1811'
                },
                {
                    atomicNumber: '54',
                    symbol: 'Xe',
                    name: 'Xenon',
                    atomicMass: '131.293(6)',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1898'
                },
                {
                    atomicNumber: '55',
                    symbol: 'Cs',
                    name: 'Cesium',
                    atomicMass: '132.9054519(2)',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1860'
                },
                {
                    atomicNumber: '56',
                    symbol: 'Ba',
                    name: 'Barium',
                    atomicMass: '137.327(7)',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: '1808'
                },
                {},
                {
                    atomicNumber: '72',
                    symbol: 'Hf',
                    name: 'Hafnium',
                    atomicMass: '178.49(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1923'
                },
                {
                    atomicNumber: '73',
                    symbol: 'Ta',
                    name: 'Tantalum',
                    atomicMass: '180.94788(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1802'
                },
                {
                    atomicNumber: '74',
                    symbol: 'W',
                    name: 'Tungsten',
                    atomicMass: '183.84(1)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1783'
                },
                {
                    atomicNumber: '75',
                    symbol: 'Re',
                    name: 'Rhenium',
                    atomicMass: '186.207(1)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1925'
                },
                {
                    atomicNumber: '76',
                    symbol: 'Os',
                    name: 'Osmium',
                    atomicMass: '190.23(3)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '77',
                    symbol: 'Ir',
                    name: 'Iridium',
                    atomicMass: '192.217(3)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '78',
                    symbol: 'Pt',
                    name: 'Platinum',
                    atomicMass: '195.084(9)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '79',
                    symbol: 'Au',
                    name: 'Gold',
                    atomicMass: '196.966569(4)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '80',
                    symbol: 'Hg',
                    name: 'Mercury',
                    atomicMass: '200.59(2)',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '81',
                    symbol: 'Tl',
                    name: 'Thallium',
                    atomicMass: '204.3833(2)',
                    groupBlock: 'metal',
                    yearDiscovered: '1861'
                },
                {
                    atomicNumber: '82',
                    symbol: 'Pb',
                    name: 'Lead',
                    atomicMass: '207.2(1)',
                    groupBlock: 'metal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '83',
                    symbol: 'Bi',
                    name: 'Bismuth',
                    atomicMass: '208.98040(1)',
                    groupBlock: 'metal',
                    yearDiscovered: ''
                },
                {
                    atomicNumber: '84',
                    symbol: 'Po',
                    name: 'Polonium',
                    atomicMass: '[209]',
                    groupBlock: 'metalloid',
                    yearDiscovered: '1898'
                },
                {
                    atomicNumber: '85',
                    symbol: 'At',
                    name: 'Astatine',
                    atomicMass: '[210]',
                    groupBlock: 'halogen',
                    yearDiscovered: '1940'
                },
                {
                    atomicNumber: '86',
                    symbol: 'Rn',
                    name: 'Radon',
                    atomicMass: '[222]',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '1900'
                },
                {
                    atomicNumber: '87',
                    symbol: 'Fr',
                    name: 'Francium',
                    atomicMass: '[223]',
                    groupBlock: 'alkaliMetal',
                    yearDiscovered: '1939'
                },
                {
                    atomicNumber: '88',
                    symbol: 'Ra',
                    name: 'Radium',
                    atomicMass: '[226]',
                    groupBlock: 'alkalineEarthMetal',
                    yearDiscovered: '1898'
                },
                {},
                {
                    atomicNumber: '104',
                    symbol: 'Rf',
                    name: 'Rutherfordium',
                    atomicMass: '[267]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1969'
                },
                {
                    atomicNumber: '105',
                    symbol: 'Db',
                    name: 'Dubnium',
                    atomicMass: '[268]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1967'
                },
                {
                    atomicNumber: '106',
                    symbol: 'Sg',
                    name: 'Seaborgium',
                    atomicMass: '[271]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1974'
                },
                {
                    atomicNumber: '107',
                    symbol: 'Bh',
                    name: 'Bohrium',
                    atomicMass: '[272]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1976'
                },
                {
                    atomicNumber: '108',
                    symbol: 'Hs',
                    name: 'Hassium',
                    atomicMass: '[270]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1984'
                },
                {
                    atomicNumber: '109',
                    symbol: 'Mt',
                    name: 'Meitnerium',
                    atomicMass: '[276]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1982'
                },
                {
                    atomicNumber: '110',
                    symbol: 'Ds',
                    name: 'Darmstadtium',
                    atomicMass: '[281]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1994'
                },
                {
                    atomicNumber: '111',
                    symbol: 'Rg',
                    name: 'Roentgenium',
                    atomicMass: '[280]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1994'
                },
                {
                    atomicNumber: '112',
                    symbol: 'Cn',
                    name: 'Copernicium',
                    atomicMass: '[285]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1996'
                },
                {
                    atomicNumber: '113',
                    symbol: 'Nh',
                    name: 'Nihonium',
                    atomicMass: '[284]',
                    groupBlock: 'post-transitionMetal',
                    yearDiscovered: '2003'
                },
                {
                    atomicNumber: '114',
                    symbol: 'Fl',
                    name: 'Flerovium',
                    atomicMass: '[289]',
                    groupBlock: 'post-transitionMetal',
                    yearDiscovered: '1998'
                },
                {
                    atomicNumber: '115',
                    symbol: 'Mc',
                    name: 'Moscovium',
                    atomicMass: '[288]',
                    groupBlock: 'post-transitionMetal',
                    yearDiscovered: '2003'
                },
                {
                    atomicNumber: '116',
                    symbol: 'Lv',
                    name: 'Livermorium',
                    atomicMass: '[293]',
                    groupBlock: 'post-transitionMetal',
                    yearDiscovered: '2000'
                },
                {
                    atomicNumber: '117',
                    symbol: 'Ts',
                    name: 'Tennessine',
                    atomicMass: '[294]',
                    groupBlock: 'post-transitionMetal',
                    yearDiscovered: '2010'
                },
                {
                    atomicNumber: '118',
                    symbol: 'Og',
                    name: 'Oganesson',
                    atomicMass: '[294]',
                    groupBlock: 'nobleGas',
                    yearDiscovered: '2002'
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                    atomicNumber: '57',
                    symbol: 'La',
                    name: 'Lanthanum',
                    atomicMass: '138.90547(7)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1839'
                },
                {
                    atomicNumber: '58',
                    symbol: 'Ce',
                    name: 'Cerium',
                    atomicMass: '140.116(1)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1803'
                },
                {
                    atomicNumber: '59',
                    symbol: 'Pr',
                    name: 'Praseodymium',
                    atomicMass: '140.90765(2)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1885'
                },
                {
                    atomicNumber: '60',
                    symbol: 'Nd',
                    name: 'Neodymium',
                    atomicMass: '144.242(3)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1885'
                },
                {
                    atomicNumber: '61',
                    symbol: 'Pm',
                    name: 'Promethium',
                    atomicMass: '[145]',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1947'
                },
                {
                    atomicNumber: '62',
                    symbol: 'Sm',
                    name: 'Samarium',
                    atomicMass: '150.36(2)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1853'
                },
                {
                    atomicNumber: '63',
                    symbol: 'Eu',
                    name: 'Europium',
                    atomicMass: '151.964(1)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1901'
                },
                {
                    atomicNumber: '64',
                    symbol: 'Gd',
                    name: 'Gadolinium',
                    atomicMass: '157.25(3)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1880'
                },
                {
                    atomicNumber: '65',
                    symbol: 'Tb',
                    name: 'Terbium',
                    atomicMass: '158.92535(2)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1843'
                },
                {
                    atomicNumber: '66',
                    symbol: 'Dy',
                    name: 'Dysprosium',
                    atomicMass: '162.500(1)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1886'
                },
                {
                    atomicNumber: '67',
                    symbol: 'Ho',
                    name: 'Holmium',
                    atomicMass: '164.93032(2)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1878'
                },
                {
                    atomicNumber: '68',
                    symbol: 'Er',
                    name: 'Erbium',
                    atomicMass: '167.259(3)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1842'
                },
                {
                    atomicNumber: '69',
                    symbol: 'Tm',
                    name: 'Thulium',
                    atomicMass: '168.93421(2)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1879'
                },
                {
                    atomicNumber: '70',
                    symbol: 'Yb',
                    name: 'Ytterbium',
                    atomicMass: '173.054(5)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1878'
                },
                {
                    atomicNumber: '71',
                    symbol: 'Lu',
                    name: 'Lutetium',
                    atomicMass: '174.9668(1)',
                    groupBlock: 'lanthanoid',
                    yearDiscovered: '1907'
                },
                {},
                {},
                {},
                {
                    atomicNumber: '89',
                    symbol: 'Ac',
                    name: 'Actinium',
                    atomicMass: '[227]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1899'
                },
                {
                    atomicNumber: '90',
                    symbol: 'Th',
                    name: 'Thorium',
                    atomicMass: '232.03806(2)',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1828'
                },
                {
                    atomicNumber: '91',
                    symbol: 'Pa',
                    name: 'Protactinium',
                    atomicMass: '231.03588(2)',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1913'
                },
                {
                    atomicNumber: '92',
                    symbol: 'U',
                    name: 'Uranium',
                    atomicMass: '238.02891(3)',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1789'
                },
                {
                    atomicNumber: '93',
                    symbol: 'Np',
                    name: 'Neptunium',
                    atomicMass: '[237]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1940'
                },
                {
                    atomicNumber: '94',
                    symbol: 'Pu',
                    name: 'Plutonium',
                    atomicMass: '[244]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1940'
                },
                {
                    atomicNumber: '95',
                    symbol: 'Am',
                    name: 'Americium',
                    atomicMass: '[243]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1944'
                },
                {
                    atomicNumber: '96',
                    symbol: 'Cm',
                    name: 'Curium',
                    atomicMass: '[247]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1944'
                },
                {
                    atomicNumber: '97',
                    symbol: 'Bk',
                    name: 'Berkelium',
                    atomicMass: '[247]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1949'
                },
                {
                    atomicNumber: '98',
                    symbol: 'Cf',
                    name: 'Californium',
                    atomicMass: '[251]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1950'
                },
                {
                    atomicNumber: '99',
                    symbol: 'Es',
                    name: 'Einsteinium',
                    atomicMass: '[252]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1952'
                },
                {
                    atomicNumber: '100',
                    symbol: 'Fm',
                    name: 'Fermium',
                    atomicMass: '[257]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1952'
                },
                {
                    atomicNumber: '101',
                    symbol: 'Md',
                    name: 'Mendelevium',
                    atomicMass: '[258]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1955'
                },
                {
                    atomicNumber: '102',
                    symbol: 'No',
                    name: 'Nobelium',
                    atomicMass: '[259]',
                    groupBlock: 'actinoid',
                    yearDiscovered: '1957'
                },
                {
                    atomicNumber: '103',
                    symbol: 'Lr',
                    name: 'Lawrencium',
                    atomicMass: '[262]',
                    groupBlock: 'transitionMetal',
                    yearDiscovered: '1961'
                }
            ],
            groupBlocks: [
                {name: 'Nonmetal', color: '#95a5a6'},
                {name: 'Noble Gas', color: '#8E44AD'},
                {name: 'Alkali Metal', color: '#E74C3C'},
                {name: 'Alkaline Earth Metal', color: '#E67E22'},
                {name: 'Metalloid', color: '#3498DB'},
                {name: 'Halogen', color: '#EC87BF'},
                {name: 'Metal', color: '#2ECC71'},
                {name: 'Post-transition Metal', color: '#1ABC9C'},
                {name: 'Transition Metal', color: '#F1C40F'},
                {name: 'Lanthanoid', color: '#F39C12'},
                {name: 'Actinoid', color: '#ECF0F1'}
            ],
            selectedSquare: '',
            overlay: false
        };
    },
    methods: {
        resizeSquares: function () {
            let squares = document.getElementsByClassName('square');
            squares.forEach((element) => (element.style.height = element.offsetWidth + 'px'));
        },
        showDetails: function (square) {
            if (square.name) {
                console.log(square.name);
                this.overlay = !this.overlay;
                this.selectedSquare = square;
            }
        },
        hideOverlay: function () {
            this.overlay = !this.overlay;
        }
    },
    mounted() {
        //this.resizeSquares();
        console.log(this.overlay);
    }
});
