interface CounterDefinitions {
  aggregate_attribute: string;
  aggregation_function: string;
}

interface EntitiesByIntegration {
  airwatch: string[];
}

interface Operands {
  operand_type: string;
  data_type: string;
  value: string;
}

interface FilterCondition {
  parenthesized: boolean;
  nested_attribute: boolean;
  custom_attribute: boolean;
  attribute: string;
  operator: string;
  operands: Operands;
  operand_collection_present: boolean;
}

interface Operands {
  operand_type: string;
  data_type: string;
  value: string;
}

interface Rules {
  type: string;
  nested_attribute: boolean;
  custom_attribute: boolean;
  attribute: string;
  operator: string;
  operands: Operands;
  operand_collection_present: boolean;
}

interface FilterConditionNestedRules {
  type: string;
  rules: Rules;
}

interface TrendDefinition {
  trend_mode: string;
  bucketing_attributes: string[];
  counter_definitions: CounterDefinitions;
  filter: string;
  entities_by_integration: EntitiesByIntegration;
  cardinality: number;
  accumulate: boolean;
  ignore_case: boolean;
  filter_condition: FilterCondition;
  all_report_column_attributes: string[];
  filter_condition_nested_rules: FilterConditionNestedRules;
}

interface ColumnBasicView {
  name: string;
  label: string;
  data_type: string;
}

interface BucketingAttributes {
  column_basic_view: ColumnBasicView;
  value: string;
}

interface Definition {
  aggregate_attribute: string;
  aggregation_function: string;
}

interface ColumnBasicView {
  name: string;
  label: string;
  data_type: string;
}

interface Result {
  column_basic_view: ColumnBasicView;
  value: number;
}

interface Counters {
  definition: Definition;
  result: Result;
}

interface TrendResults {
  start_millis: number;
  end_millis: number;
  date_attribute_name: string;
  bucketing_attributes: BucketingAttributes;
  counters: Counters;
}

interface Data {
  trend_definition: TrendDefinition;
  trend_results: TrendResults;
}

interface SkyData {
  data: Data;
}
