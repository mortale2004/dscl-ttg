import type { CollectionReferenceType } from "@dscl-ttg/models/constants";
export const prepareQuery = (
  _id: string,
  reference_models: CollectionReferenceType[],
) => {
  let aggregationQuery: any[] = [
    {
      $match: {
        _id: _id,
      },
    },
  ];

  // Prepare the dynamic lookups
  for (let model of reference_models) {
    aggregationQuery.push({
      $lookup: {
        from: model.collection,
        let: { primaryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                ...(model.isArray
                  ? { $in: ["$$primaryId", `$${model.field}`] }
                  : { $eq: ["$$primaryId", `$${model.field}`] }),
              },
            },
          },
        ],
        as: model.collection,
      },
    });
  }
  return aggregationQuery;
};

export const isReferenceExists = async (
  response: any,
  reference_models: CollectionReferenceType[],
) => {
  for (const model of reference_models) {
    if (response?.[model.collection]?.length > 0) {
      return true;
    }
  }
  return false;
};
