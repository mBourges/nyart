<script>
  import { formatCurrency } from '@/lib/currency';

  export default {
    functional: true,
    name: 'currency-display',
    render: (h, { props }) => {
      const { value, symbol } = props;
      const currency = formatCurrency(value, symbol);

      return <span>{ currency }</span>;
    }
  };
</script>
