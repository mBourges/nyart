import { isEmpty } from './immutable';
import Elastic from './elastic';

function retrieveCompaniesStats(recruiter, period) {
  const elastic = new Elastic()
    .setIndex('companies')
    .query({
      'query': {
        'bool': {
          'must': {
            'match_all': {}
          },
          'filter': [
            { 'term': { 'Recruiter.id': recruiter.id } },
            { 'range': {
              'RegistrationDate': {
                'gte': period.range[0],
                'lte': period.range[1],
                'format': 'yyyy-MM-dd'
              }
            } }
          ]
        }
      }
    });

  return elastic.count()
    .then(({ count }) => {
      return { companies: count };
    });
}

function retrieveJobsStats(recruiter, period) {
  const elastic = new Elastic()
    .setIndex('jobs')
    .query({
      'query': {
        'bool': {
          'must': {
            'match_all': {}
          },
          'filter': [
            { 'term': { 'Recruiter.id': recruiter.id } },
            { 'range': {
              'RegistrationDate': {
                'gte': period.range[0],
                'lte': period.range[1],
                'format': 'yyyy-MM-dd'
              }
            } }
          ]
        }
      }
    });

  return elastic.count()
    .then(({ count }) => {
      return { jobs: count };
    });
}

function retrieveContactStats(recruiter, period) {
  const elastic = new Elastic()
    .setIndex('contacts')
    .query({
      'query': {
        'bool': {
          'must': {
            'match_all': {}
          },
          'filter': [
            { 'term': { 'Recruiter.id': recruiter.id } },
            { 'range': {
              'RegistrationDate': {
                'gte': period.range[0],
                'lte': period.range[1],
                'format': 'yyyy-MM-dd'
              }
            } }
          ]
        }
      },
      'aggs': {
        'Type': { 'terms': { 'field': 'Type' } }
      }
    });

  return elastic.searchWithBody()
    .then(({ aggregations }) => {
      const stats = aggregations
        .Type
        .buckets
        .reduce((aggr, curr) => {
          return Object.assign({}, aggr, {
            [curr.key.replace(/\s/g, '_')]: curr.doc_count
          });
        }, {});

      return stats;
    });
}

export default function retrieveKPI(recruiter, period) {
  if (isEmpty(recruiter)) {
    return Promise.reject(new Error('Recruiter cannot be null or empty'));
  }

  return Promise.all([
    retrieveCompaniesStats(recruiter, period),
    retrieveContactStats(recruiter, period),
    retrieveJobsStats(recruiter, period)
  ]).then(([ companies, contacts, jobs ]) => ({
    ...companies,
    ...contacts,
    ...jobs
  }));
}
