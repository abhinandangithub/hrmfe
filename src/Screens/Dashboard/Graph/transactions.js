import ae from '../../../assets/cards/american-express-img.png'
import master from '../../../assets/cards/master-card-img.png'
import visa from '../../../assets/cards/visa-img.png'

const Transactions = [
  {
    img: visa,
    cardNo: 4230,
    date: '17 Mar 2022',
    status: 'Verified',
    Trend: '+$1678'
  },
  {
    img: master,
    cardNo: 5578,
    date: '12 Feb 2022',
    status: 'Rejected',
    Trend: '-$839'
  },
  {
    img: ae,
    cardNo: 4567,
    date: '28 Feb 2022',
    status: 'Verified',
    Trend: '+$435'
  },
  {
    img: visa,
    cardNo: 5699,
    date: '8 Jar 2022',
    status: 'Pending',
    Trend: '+$2345'
  },
  {
    img: visa,
    cardNo: 5699,
    date: '8 Jan 2022',
    status: 'Rejected',
    Trend: '-$234'
  }
]

export default Transactions
