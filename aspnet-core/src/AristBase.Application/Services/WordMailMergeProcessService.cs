using Abp;
using Abp.Dependency;
using AristBase.BaseEntity;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AristBase.Services
{
    public class WordMailMergeProcessService :  AbpServiceBase, IFileProcessService,ITransientDependency
    {        
        public const string TableColPrefix = "col_";

        public List<BaseEntity.TableDescription> ListAllColumns(Table table)
        {
            var tableDescriptions = new List<BaseEntity.TableDescription>();
            foreach (var row in table.Descendants<TableRow>())
            {
                // check if all the cells in the row have merge fields
                bool allCellsHaveMergeFields = true;
                //var description = new BaseEntity.TableDescription();
                var description = new BaseEntity.TableDescription()
                {
                    Fields = new Dictionary<string, FieldDescription>()
                };
                foreach (var cell in row.Descendants<TableCell>())
                {
                    var mergeField = cell.Descendants<FieldCode>().SingleOrDefault(c => c.InnerText.Contains(TableColPrefix));
                    if (mergeField == null)
                    {
                        allCellsHaveMergeFields = false;
                        break;
                    }
                    description.Fields.TryAdd(mergeField.InnerText, new FieldDescription { Description = "" });
                }

                if (allCellsHaveMergeFields)
                {
                    // do something with the row
                    tableDescriptions.Add(description);
                }
            }
            return tableDescriptions;
        }
        public List<TableRow> ListAllRows(Table table)
        {
            var tableDescriptions = new List<TableRow>();
            foreach (var row in table.Descendants<TableRow>())
            {
                // check if all the cells in the row have merge fields
                bool allCellsHaveMergeFields = true;
                foreach (var cell in row.Descendants<TableCell>())
                {
                    var mergeField = cell.Descendants<FieldCode>().SingleOrDefault(c => c.InnerText.Contains(TableColPrefix));
                    if (mergeField == null)
                    {
                        allCellsHaveMergeFields = false;
                        break;
                    }
                }
                if (allCellsHaveMergeFields)
                {
                    // do something with the row
                    tableDescriptions.Add(row);
                }
            }
            return tableDescriptions;
        }
        public Dictionary<string, BaseEntity.TableDescription> LoadAllTableDescription(Body body)
        {
            Dictionary<string, BaseEntity.TableDescription> tableDescriptions = new Dictionary<string, BaseEntity.TableDescription>();
            // Get the first table in the document
            var tables = body.Descendants<Table>();

            foreach (var (table, index) in tables.Select((value, i) => (value, i)))
            {
                Console.WriteLine($"Item {index}: {table}");
                var lstDescription = ListAllColumns(table);

                for (int i = 0; i < lstDescription.Count; i++)
                {
                    var item = lstDescription[i];
                    tableDescriptions.Add($"{index}_{i}", item);
                }
            }
            return tableDescriptions;
        }
        public async void LoopThroughDataFields(string templatePath, string templatePathNew, TemplateValue templateValue)
        {
            System.IO.File.Copy(templatePath, templatePathNew, true);
            using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(templatePathNew, true))
            {
                // Get the document content
                MainDocumentPart mainPart = wordDoc.MainDocumentPart;

                var tables = mainPart.Document.Body.Descendants<Table>().Where(x => x.InnerText.Contains(TableColPrefix)).ToList();

                if (tables.Count > 0)
                {
                    foreach (var (table, index) in tables.Select((value, i) => (value, i)))
                    {
                        var lstDescription = ListAllRows(table);
                        int count = 0;
                        foreach (var row in lstDescription)
                        {
                            foreach (var item2 in templateValue.TableFields[$"{index}_{count}"].Values)
                            {
                                TableRow tableRow = new TableRow();

                                foreach (TableCell tbcell in row.Descendants<TableCell>())
                                {
                                    TableCell cell = new TableCell();
                                    foreach (var tkd1 in item2)
                                    {
                                        if (ProcessServiceFactory.GetMergeFiledKey(tbcell.InnerText).Equals(ProcessServiceFactory.GetMergeFiledKey(tkd1.Key)))
                                        {
                                            cell.AddChild(new Paragraph(new Run(new Text(tkd1.Value.Value))));
                                        }
                                        if (tbcell.TableCellProperties.GridSpan != null)
                                        {
                                            if (cell.TableCellProperties == null)
                                            {
                                                cell.TableCellProperties = new TableCellProperties();
                                            }
                                            int span = tbcell.TableCellProperties.GridSpan.Val;
                                            cell.TableCellProperties.GridSpan = new GridSpan() { Val = span };
                                        }
                                    }
                                    tableRow.Append(cell);
                                }
                                table.InsertAfter(tableRow, row);
                            }
                            row.Remove();
                            count++;
                        }
                    }
                }
                var mergeFields = mainPart.Document.Descendants<FieldCode>();
                foreach (var mergeField in mergeFields)
                {
                    // Get the merge field key
                    string mergeFieldKey = mergeField.InnerText;
                    if (!ProcessServiceFactory.GetMergeFiledKey(mergeFieldKey).Contains(TableColPrefix))
                    {
                        foreach (var item in templateValue.Fields)
                        {
                            var itemKey = item.Key;
                            var inputKd = templateValue.Fields[item.Key];
                            if (itemKey.Equals(mergeFieldKey))
                            {
                                string mergeFieldValue = templateValue.Fields[mergeFieldKey].Value;
                                ReplaceMergeFieldWithText(mergeField, mergeFieldValue);
                            }
                        }
                    }
                }
                mainPart.Document.Save();
            }
        }
        void ReplaceMergeFieldWithText(FieldCode field, string replacementText)
        {
            try
            {
                if (field != null)
                {
                    // Get the Run that contains our FieldCode
                    // Then get the parent container of this Run
                    Run rFldCode = (Run)field.Parent;

                    // Get the three (3) other Runs that make up our merge field
                    Run rBegin = rFldCode.PreviousSibling<Run>();
                    Run rSep = rFldCode.NextSibling<Run>();
                    Run rText = rSep.NextSibling<Run>();
                    Run rEnd = rText.NextSibling<Run>();

                    // Get the Run that holds the Text element for our merge field
                    // Get the Text element and replace the text content 
                    Text t = rText.GetFirstChild<Text>();
                    t.Text = replacementText;
                    // Remove all the four (4) Runs for our merge field
                    rFldCode.Remove();
                    rBegin.Remove();
                    rSep.Remove();
                    rEnd.Remove();
                }
            }
            catch (Exception ex) { }
        }
        public TemplateDescription ExtractDescription(string templatePath)
        {
            using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(templatePath, true))
            {
                // Get the document content
                MainDocumentPart mainPart = wordDoc.MainDocumentPart;
                // Find the data fields
                var textFields = mainPart.Document.Descendants<FieldCode>().Where(t => !t.InnerText.Contains(TableColPrefix));
                // Loop through the data fields and modify their content
                TemplateDescription templateDescription = new TemplateDescription
                {
                    Fields = new Dictionary<string, FieldDescription>(),
                    TableFields = LoadAllTableDescription(mainPart.Document.Body)
                };
                foreach (var textField in textFields)
                {
                    var fieldText = textField.InnerText;
                    ProcessServiceFactory.GetMergeFiledKey(fieldText);
                    //var key = fieldText.Replace("MERGEFIELD", string.Empty).Trim();
                    //Get key of data, find in table keydata
                    //key = key.Split(@"\*").First().Trim();
                    //templateDescription = new TemplateDescription
                    //{
                    //    Fields = new Dictionary<string, FieldDescription>
                    //    {
                    //        { key, new FieldDescription { Description = "" } },
                    //    },
                    //    //TableFields = new Dictionary<string, TableDescription>()
                    //};
                    templateDescription.Fields.Add(fieldText, new FieldDescription { Description = "" });

                }
                return templateDescription;
                //mainPart.Document.Save();
            }
        }
    }
}
