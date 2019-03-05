Function fillInMissingData(s As Range) As Variant
' does a straight line extrapolation of missing column data in individual rows
' must be called from top left cell with d(estination) range selected of same size as s(ource) range and entered with ctrl/shift/enter
Dim d() As Variant
Dim r, c, lookAhead, divisor As Long
d = s.Value 'move entire array from source to destination
For r = 1 To s.Rows.Count
    For c = 1 To s.Columns.Count
       If s.Cells(r, c).Value2 > 0 Then
    '       got data; no need to correct
    '       d(r, c) = s.Cells(r, c).Value2
       ElseIf c = 1 Then
    '       don't have data but cant extrapolate since we're at the beginning; dont correct
    '       d(r, c) = 0
       ElseIf c = s.Columns.Count Then
    '       don't have data but cant extrapolate since we're at the end; dont correct
    '      d(r, c) = d(r, c - 1)
       ElseIf d(r, c - 1) = 0 Then
    '       don't have data in the middle but previous is missing dont correct
    '     d(r, c) = 0
       Else
    '       dont have data in the middle but corrected previous has got data; try to correct
            divisor = 2
	'		set default if no further data
            d(r, c) = 0
    '       look ahead to find next with data to correct this one
            For lookAhead = c + 1 To s.Columns.Count
                If s.Cells(r, lookAhead).Value2 > 0 Then
                ' correct based on longest straight line to next non-zero value
                    d(r, c) = ((s.Cells(r, lookAhead).Value2 - d(r, c - 1)) / divisor) + d(r, c - 1)
                    Exit For
                End If
				' no data look further ahead
                divisor = divisor + 1
            Next lookAhead
        End If
     Next c
Next r
fillInMissingData = d
End Function

